import path from 'node:path';
import fs from 'node:fs';
import { stat, writeFile } from 'node:fs/promises';
import { parseStream } from 'fast-csv';
import { writeToPath } from '@fast-csv/format';
import { v4 as uuidv4 } from 'uuid';

import type {
  CreateUserInput,
  DeleteUserParams,
  GetUserParams,
  UpdateUserInput,
  UpdateUserParams,
} from '../schemas/userSchema';

export interface UserDoc {
  uid: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

const csvPath = path.join(process.cwd(), 'data', 'users.csv');

class UserModel {
  users: UserDoc[] = [];

  constructor() {
    this.createFile();
    this.users = [];
    this.readCSV();
  }

  getUsers() {
    return this.users;
  }

  getUser(user: GetUserParams) {
    return this.users.find((u) => u.uid === user.id);
  }

  createUser(user: CreateUserInput) {
    const newUser = {
      uid: uuidv4(),
      name: user.name,
      email: user.email,
      phone: user.phone,
      age: user.age,
      address: user.address,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.push(newUser);
    this.writeCSV();
    return newUser;
  }

  updateUser(user: UpdateUserInput & UpdateUserParams) {
    const index = this.users.findIndex((u) => u.uid === user.id);
    if (index > -1) {
      this.users[index] = {
        ...this.users[index],
        ...user,
        updatedAt: new Date(),
      };
      this.writeCSV();
      return this.users[index];
    }
    return null;
  }

  deleteUser(user: DeleteUserParams) {
    const index = this.users.findIndex((u) => u.uid === user.id);
    if (index > -1) {
      this.users.splice(index, 1);
      this.writeCSV();
      return true;
    }
    return false;
  }

  private readCSV() {
    const stream = fs.createReadStream(csvPath);

    parseStream(stream, {
      headers: true,
    })
      .on('data', (data: UserDoc) => this.users.push(data))
      .on('end', () => console.log('CSV file read successfully'))
      .on('error', (error) => console.error('Error reading CSV file:', error));
  }

  private writeCSV() {
    writeToPath(csvPath, this.users, {
      headers: [
        'uid',
        'name',
        'email',
        'phone',
        'age',
        'address',
        'createdAt',
        'updatedAt',
      ],
    })
      .on('error', (err) => console.error(err))
      .on('finish', () => console.log('CSV file written successfully'));
  }

  private async checkIfFileExists() {
    return stat(csvPath)
      .then(() => true)
      .catch(() => false);
  }

  private async createFile() {
    if (!(await this.checkIfFileExists())) {
      await writeFile(csvPath, '');
    }
  }
}

const User = new UserModel();

export default User;

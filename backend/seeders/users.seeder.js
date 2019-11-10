import { Seeder } from 'mongoose-data-seed';
import User from '../src/schemas/user';
import bcrypt from 'bcrypt';
import moment from 'moment';

var password = bcrypt.hashSync('123mudar', 10);

const data = [{
  name: 'Admin',
  email: 'admin@admin.com',
  password,
  is_active: true,
  created_at: moment().format('YYYY-MM-DD'),
}];

class UsersSeeder extends Seeder {

  async shouldRun() {
    return User.countDocuments().exec().then(count => count === 0);
  }

  async run() {
    return User.create(data);
  }
}

export default UsersSeeder;

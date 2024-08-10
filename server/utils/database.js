const mongoose = require('mongoose');
const { SERVER } = require('../api/config/environment');
const Role = require('../api/model/role');
const User = require('../api/model/user');
const fs = require('fs').promises;

mongoose.connect(SERVER.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function () {
    try {
        const roleCount = await Role.countDocuments();
        if (roleCount === 0) {
            const roleData = await fs.readFile('./uploads/role.json', 'utf-8');
            const roles = JSON.parse(roleData);
            await Role.insertMany(roles);

            const userCount = await User.countDocuments();
            if (userCount === 0) {
                const userData = await fs.readFile('./uploads/user.json', 'utf-8');
                const users = JSON.parse(userData);
                const superAdminRole = await Role.findOne({ role: 'SUPERADMIN' });
                if (superAdminRole) {
                    users[0].role = superAdminRole._id;
                    users[1].role = superAdminRole._id;
                    await User.insertMany(users);
                    console.log("Multiple documents inserted to Collection");
                } else {
                    console.error("SUPERADMIN role not found");
                }
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

const bcrypt = require('bcryptjs');

exports.generateHashedPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(12));
};

exports.passwordsAreEqual = (rawPassword, hashedPassword) => {
    return bcrypt.compareSync(rawPassword, hashedPassword);
};

exports.generateREAMatricule = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(2);

    const randomString = crypto.randomBytes(6).toString('base64').replace(/[^A-Z]/g, '').slice(0, 12).toUpperCase();

    return `REA-${day}${month}${year}-${randomString}`;
};

const { sign } = require('jsonwebtoken');

exports.generateAuthToken = (id_user, label_user, role_user) => {
    return sign({ id_user, label_user, role_user }, "PING PONG", { expiresIn: process.env.JWT_EXPIRES_IN });
};

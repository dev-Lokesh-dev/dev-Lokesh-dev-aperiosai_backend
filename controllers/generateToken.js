import jwt from 'jsonwebtoken';

const generateToken = async (req, res) => {

    const payload = { client: 'Retailer-App' };
    const secretKey = process.env.JWT_SECRET;
    const token = jwt.sign(payload, secretKey, { expiresIn: '30d' });
    res.status(200).json({ token });

}

export {generateToken}
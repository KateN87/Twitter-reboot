import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
	const {userName, password} = req.body
    //checks if userName and password is put in
    if(!userName || password) {
        throw Error ('Please fill in username and password')
    }

    //checks if userName already exists
    const 

});

signup = async function (userName, password) {

    //check if userName already exists
    const exists = await this.findOne({ userName });

    if (exists) {
        throw Error('User name already in use');
    }

    //Chcecks if password is strong enough
    if (!validator.isStrongPassword(password)) {
        throw Error(
            'Password not strong enough. Needs to be at least 8 characters and contain lower case, upper case, number and special character'
        );
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await this.create({ userName, password: hash });

    return user;
};

export default router;

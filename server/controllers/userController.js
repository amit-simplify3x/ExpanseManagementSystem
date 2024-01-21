const userModel = require("../models/userModel");

// login callback
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password });
    if (!user) {
      return res.status(404).send("User Not Found");
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

//Register Callback
const registerController = async (req, res) => {
  try {
    const {name, email, password} = req.body;
    console.log(name, email, password);
    if(!name || !email || !password){
      console.log("All fields are required!")
      return;
    }

     const newUser = await userModel.create({
        name,
        email,
        password
    });

    console.log(newUser);
    if(newUser){
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
        });
    }
    else{
        res.status(400);
    throw new Error("Unable to create user!");
    }
    // const newUser = new userModel(req.body);
    // await newUser.save();
    // res.status(201).json({
    //   success: true,
    //   newUser,
    // });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

module.exports = { loginController, registerController };

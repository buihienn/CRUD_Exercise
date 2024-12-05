const controller = {};
const models = require("../models");

controller.show = async (req, res) => {
  // findAll = SELECT * from User - conf Attributes truy van nhung cot gia tri được chỉ định.
  res.locals.users = await models.User.findAll({
    attributes: [
      "id",
      "imagePath",
      "username",
      "firstName",
      "lastName",
      "mobile",
      "isAdmin",
    ],
    order: [["createdAt", "DESC"]], // Order by => trong SQL xep giam dan DESC
  });
  res.render("user-management");
};

controller.addUser = async(req, res) => {
  console.log (req.body);
  const {firstName, lastName, username, mobile, isAdmin} = req.body;  // tên của control trong form
  try {
    await models.User.create({
      firstName,
      lastName,
      username,
      mobile,
      isAdmin: isAdmin ? true : false,
    });

    res.redirect ("/users");
  }
  catch (e) {
    console.error(e);
    res.status()
  }
}

controller.editUser = async(req, res) => {
  const { id, firstName, lastName, mobile, isAdmin} = req.body;
  try {
    await models.User.update(
      {
        firstName,
        lastName,
        mobile,
        isAdmin: isAdmin ? true : false,
      },
      {
        where: {id},
      }
    );
    res.send("User has been updated!");

  }
  catch (error){
    console.error(error);
    res.status(500).send("Can not update user!");
  }
}

controller.deleteUser = async(req, res) => {
  const id = isNaN(req.params.id) ? 0 : parseInt(req.params.id);
  try {
    await models.User.destroy({where : {id}});
    res.send("User has been deleted");
  }
  catch (error){
    console.error(error);
    res.status(500).send("Can not delete user!");
  }
}

module.exports = controller;

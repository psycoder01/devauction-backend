const upload = require("./multer");
const User = require("../models/user.schema");
const main = require("../config/index");

const findUser = (req, res) => {
    User.find(
        { name: req.params.name },
        {
            name: 1,
            email: 1,
            imgUrl: 1,
            createdAt: 1,
            bio: 1,
            location: 1,
            nature: 1,
            followersCount: 1,
            followingCount: 1,
        }
    )
        .then((result) => {
            return res.json(result);
        })
        .catch((err) => res.status(400).send("Error Finding User"));
};

const getUser = async (req, res) => {
    User.findOne({ _id: req.user.id }, { password: 0 })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => res.status(400).send("Server Error ! "));
};

const getUsers = async (req, res) => {
    try {
        const ids = req.body.userIds;
        const data = await User.find(
            {
                _id: { $in: ids },
            },
            { name: 1, imgUrl: 1 }
        );
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(400).send("Server Error!");
    }
};

//Updating User Details
const updateUser = (req, res) => {
    const id = req.user.id;
    User.findByIdAndUpdate(
        id,
        {
            name: req.body.name,
            email: req.body.email,
            bio: req.body.bio,
            nature: req.body.nature,
            location: req.body.location,
        }
    )
        .then(() => res.send("Updated Details"))
        .catch((err) => {
            console.log(err);
            return res.status(400).send("some error");
        });
};

//Deleting a User
const deleteUser = (req, res) => {
    User.findByIdAndDelete(req.user.id)
        .then(() => res.send("Deleting user completely can take some time!"))
        .catch((err) => res.status(400).send("Server Error!"));
};

//Image upload controller
const imageUpload = (req, res) => {
    //Multer Upload
    upload(req, res, (err) => {
        if (err) return res.status(400).send("Error Uploading Image");
    });

    //Update ImgUrl in Database
    User.findById(req.user.id)
        .then((item) => {
            item.imgUrl = `${main}/${req.file.path}`;

            item.save();
        })
        .catch((err) => res.status(400).send("Server Error"));

    return res.send("Avatar Updated Successfully");
};

//Follow user
const followUser = (req, res) => {
    User.findByIdAndUpdate(req.user.id, {
        $inc: { followingCount: 1 },
        $addToSet: { following: req.body.following },
    })
        .then(() => {
            return User.findByIdAndUpdate(req.body.following, {
                $inc: { followersCount: 1 },
                $addToSet: { followers: req.user.id },
            });
        })
        .then(() => {
            res.send("Successful");
        })
        .catch((err) => console.log(err));
};
//UnFollow User
const unfollowUser = (req, res) => {
    User.findByIdAndUpdate(req.user.id, {
        $inc: { followingCount: -1 },
        $pull: { following: req.body.following },
    })
        .then(() => {
            return User.findByIdAndUpdate(req.body.following, {
                $inc: { followersCount: -1 },
                $pull: { followers: req.user.id },
            });
        })
        .then(() => {
            res.send("Successful");
        })
        .catch((err) => console.log(err));
};

module.exports = {
    imageUpload,
    updateUser,
    deleteUser,
    getUser,
    findUser,
    getUsers,
    followUser,
    unfollowUser,
};

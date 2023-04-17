import mongoose from "mongoose";

export const users = [
    {
        _id: new mongoose.Types.ObjectId(),
        firstName: "Steve",
        lastName: "Jobs",
        email: "stevejobs@gmail.com",
        password: "stevejobspassword",
        rankLists: []
    },
    {
        _id: new mongoose.Types.ObjectId(),
        firstName: "Taylor",
        lastName: "Swift",
        email: "taylorswift@gmail.com",
        password: "taylorswiftspassowrd",
        rankLists: []
    },
    {
        _id: new mongoose.Types.ObjectId(),
        firstName: "Gracie",
        lastName: "Abrams",
        email: "gracieabrams@gmail.com",
        password: "gracieabramspassword",
        rankLists: []
    },
]

export const rankLists = [
    {
        _id: new mongoose.Types.ObjectId(),
        title: "list one",
        rankList: []
    },
    {
        _id: new mongoose.Types.ObjectId(),
        title: "list two",
        rankList: []
    },
    {
        _id: new mongoose.Types.ObjectId(),
        title: "list three",
        rankList: []
    },
]
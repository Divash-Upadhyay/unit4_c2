const express = require("express");
const { type } = require("express/lib/response");

const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const connect = () => {
    return mongoose.connect(
        ("mongodb+srv://dishu:qwerty123456@evaluation.ubmpk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    );
};

const userSchemas = new mongoose.Schema(
    {
        id: { type: Number, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        middleName: { type: String, required: true },
        age: { type: Number, required: true },
        email: { type: String, required: true },
        Adress: { type: String, required: true },
        gender: { type: String, required: true, default: "female" },
        type: { type: String, required: false },
    },
    {
        versionKey: false,
        timestamps: true,
    }

);


const User = mongoose.model("user", userSchemas);


const branchdetailsSchemas = new mongoose.Schema(
    {
        id: { type: Number, required: true },
        Name: { type: String, required: true },
        Adress: { type: String, required: true },
        IFSC: { type: String, required: true },
        MICR: { type: Number, required: true },

        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const branchDetail = mongoose.model("branchDetail", branchdetailsSchemas);


const masterAccountSchemas = new mongoose.Schema(
    {
        id: { type: Number, required: true },
        balance: { type: Number, required: true },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }

);


const masterAccount = mongoose.model("masterAccount", masterAccountSchemas);

const savingsAccountSchemas = new mongoose.Schema(
    {
        id:{type:Number,required:true},
        account_number:{type:Number,required:true, unique:true},
        balance:{type:Number,required:true},
        interestRate:{type:Number,required:true},

        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        master_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "masterAccount",
            required: true,
        },
        
    },
    {
        versionKey: false,
        timestamps: true,
    }
);


const savingsAccount = mongoose.model("savingsAccount", savingsAccountSchemas);

const fixedAccountSchemas = new mongoose.Schema(
    {
        id:{type:Number,required:true},
        account_number:{type:Number,required:true,unique:true},
        balance:{type:Number,required:true},
        interestRate:{type:Number,required:true},
        startDate:{type:Number,required:true},
        maturityDate:{type:Number,required:true},

        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        master_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "masterAccount",
            required: true,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
)
const fixedAccount = mongoose.model("fixedAccount", fixedAccountSchemas);


// API's
app.get("/masterAccounts", async (res, req) => {
    try {
        const users = await masterAccount.find().lean().exec();
        return res.statusCode(201).send(users)
    }
    catch(e) {
        return res.statusCode(500).send(e.message)
    }
})

app.post("/savingsAccounts", async (res, req) => {
    try {
        const details = await savingsAccount.create(req.body);
        return res.statusCode(201).send(details)
    }
    catch(e) {
        return res.statusCode(500).send(e.message)
    }
})

app.post("/fixedAccounts", async (res, req) => {
    try {
        const details = await fixedAccount.create(req.body);
        return res.statusCode(201).send(details)
    }
    catch(e) {
        return res.statusCode(500).send(e.message)
    }
})

app.get("/masterAccounts/id", async (res, req) => {
    try {
        const account = await masterAccount.find().lean().exec();
        return res.statusCode(201).send(users)
    }
    catch(e) {
        return res.statusCode(500).send(e.message)
    }
})




app.listen(2347, async function () {
    try {
        await connect();
        console.log("runnimg on port 2347");
    } catch (e) {
        console.log(e.message);
    }
});
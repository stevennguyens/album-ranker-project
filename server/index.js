import express, { query } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import rankListRoutes from "./routes/rankLists.js";
import querystring from "querystring";
import fetch from "node-fetch";
import { register } from "./controllers/auth.js";
import { createRankList } from "./controllers/rankLists.js";

// configs
dotenv.config()
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({extended: true}));
app.use(express.urlencoded({extended: true}));
app.use(cors());
const upload = multer();
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

const generateRandomString = (length) => {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

// routes
const stateKey = "spotify_auth_state";
app.get('/login', async (req, res) => {
    var state = generateRandomString(16);
    //res.cookie(stateKey, state)
    var scope = 'user-read-private user-read-email';
    const queryParams = querystring.stringify({
        client_id: CLIENT_ID,
        response_type: "code",
        redirect_uri: REDIRECT_URI,
        state: state,
        scope: scope,
    })
    res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

app.get('/callback', async (req, res) => {
    const code = req.query.code || null;
    // const state = req.query.state || null;
    // const storedState = req.cookies ? req.cookies[stateKey] : null;

    // if (state == null || state !== storedState) {
    //     res.redirect(`/#${querystring.stringify({ error: 'state_mismatch' })}`);
    // } else {
        res.clearCookie(stateKey);
        await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            'Authorization': 'Basic ' + (new Buffer.from(CLIENT_ID+":"+CLIENT_SECRET).toString('base64'))
            },
            body: querystring.stringify({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: REDIRECT_URI,
            })
        })
        .then(response => {
            if (response.status != 200) {
                res.redirect(`/?${queryParams.stringify({error:'invalid_token'})}`);
            } else {
                return response.json()
            }
        })
        .then(data => {
            const { access_token, refresh_token, expires_in } = data;
            const queryParams = querystring.stringify({
                access_token,
                refresh_token,
                expires_in
            });
            res.redirect(`http://localhost:3000/?${queryParams}`);
        })
        .catch(error => {
            res.send(error);
        })
    //}
});

app.get('/refresh_token', async (req, res) => {
    const refresh_token = req.query.refresh_token;
    console.log(refresh_token);
    await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: querystring.stringify({
            grant_type: 'refresh_token',
            refresh_token: refresh_token,
        }),
        headers: {
            'CONTENT_TYPE': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        },
    })
    .then(response => response.json())
    .then(data => {
        res.send(data);
        //res.json(data);
    })
    .catch(err => {
        res.send(err)
    })
})
app.post("/auth/register", upload.fields([]), register)
app.post("/ranklists", upload.fields([]), createRankList)
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/ranklists", rankListRoutes);

 // mongoose set up
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`server:${PORT}`));
    // add data once
    // User.insertMany(users);
    // RankList.insertMany(rankLists);
}).catch((error) => console.log(error))
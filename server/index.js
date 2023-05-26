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
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const SERVER_URL = process.env.NODE_ENV === "production" ? process.env.REACT_APP_SERVER_URL : "http://localhost:3001";
const CLIENT_URL = process.env.NODE_ENV === "production" ? process.env.REACT_APP_CLIENT_URL : "http://localhost:3000";
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
        redirect_uri: `${SERVER_URL}/callback`,
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
        //res.clearCookie(stateKey);
        await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            'Authorization': 'Basic ' + (new Buffer.from(CLIENT_ID+":"+CLIENT_SECRET).toString('base64'))
            },
            body: querystring.stringify({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: `${SERVER_URL}/callback`,
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
            // const { access_token, refresh_token, expires_in } = data;
            const { access_token, refresh_token, expires_in } = data;
            const queryParams = querystring.stringify({
                access_token,
                refresh_token,
                expires_in
            });
            console.log("ACCESS"+access_token)
            res.redirect(`${CLIENT_URL}?${queryParams}`);
        })
        .catch(error => {
            res.send(error);
        })
    //}
});

app.get('/refresh_token', async (req, res) => {
    const refresh_token = req.query.refresh_token;
    console.log("refresh_token:" +refresh_token);
    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            body: querystring.stringify({
                grant_type: 'refresh_token',
                refresh_token: refresh_token,
            }),
            headers: {
                'CONTENT_TYPE': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
            },
        });
        const data = await response.json();
        console.log(data);
        res.send(data)
        //res.send({"access_token": data.access_token});
    } catch (e) {
        res.send({error: e.message})
    }
})
app.post("/auth/register", upload.fields([]), register)
app.post("/ranklists", upload.fields([]), createRankList)
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/ranklists", rankListRoutes);

 // mongoose set up
const PORT = process.env.REACT_APP_PORT || 6001;
mongoose.connect(process.env.REACT_APP_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`server:${PORT}`));
    // add data once
    // User.insertMany(users);
    // RankList.insertMany(rankLists);
}).catch((error) => console.log(error))
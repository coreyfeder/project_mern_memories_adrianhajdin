import 'dotenv/config'
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', postRoutes);

let connectString = `mongodb+srv://` +                                          // protocol. is the "+srv" necessary?
                    `${encodeURIComponent(process.env.MDB_USERNAME)}` +         // auth: username
                    `:${encodeURIComponent(process.env.MDB_APIKEY)}` +          // auth: pw, auth token, etc.
                    `@${process.env.MDB_APPID}.${process.env.MDB_SERVER}` +     // full server name
                    `/${process.env.MDB_DATABASE}`                              // any "path"

const PORT = process.env.MDB_PORT || 3000;

mongoose.connect(connectString)
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

// mongoose.set('useFindAndModify', false);  // not a valid option!

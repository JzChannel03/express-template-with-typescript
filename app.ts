import express from "express";
import path from "path";
import createError from "http-errors";
import logger from "morgan";
import cookieParser from "cookie-parser";
import fs from "fs";
const files = fs.readdirSync("./routes/");

// Initialize the express engine
const app: express.Application = express();


import { router as indexRouter } from "./routes/index" ;
import deasync from "deasync";

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/**
 * Add Routes
 */
let done = false;
files.forEach(async (value) => {
    const { route, router }: { route: string; router: express.Router } =
    await require(`./routes/${value}`);

    app.use(route, router);
    
    done = true;
});

deasync.loopWhile(() => !done);

// catch 404 and forward to error handler
app.use(function (_req, _res, next) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req, res: any) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;

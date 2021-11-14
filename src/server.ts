import express, { Express, Request, Response } from "express";
import cors from "cors";
import mailer from "./config/mailer";
import projects from "./data/projects.json"; // import project data

export default class Server {
  private app: Express;
  private localPath = __dirname + "/dist/";
  private API_VERSION: string;
  private PORT = process.env.PORT || 4100;
  private ISDEV = process.env.NODE_ENV === "production" ? false : true;
  private corsOptions = {
    origin: this.ISDEV
      ? "http://localhost:8080"
      : "https://www.isaacmartinez.dev",
  };

  constructor(apiVer: string) {
    this.app = express();
    this.config();
    this.routes();
    this.API_VERSION = apiVer;
    console.log(this.corsOptions.origin);
  }

  private async sendMail(req: Request, res: Response) {
    try {
      const { body, subject } = req.body;
      await mailer.sendMail({
        from: "Portfolio Contact <portfolio@example.net>",
        to: "works@isaacmartinez.dev",
        subject,
        text: body,
      });
      res.status(200).json({ message: "Sent" });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  private getProjects(_: any, res: Response) {
    res.status(200).json(projects);
  }

  private setProject(req: Request, res: Response) {
    const project = req.body;
    const newProjects = projects.push(project);
    res.status(200).json(newProjects);
  }

  private config() {
    this.app.use(express.static(this.localPath));
    this.app.use(express.json());
    this.app.use(cors(this.corsOptions));
  }

  private routes() {
    this.app.post("/api/send-mail", this.sendMail);
    this.app.get("/api/projects", this.getProjects);
    this.app.post("/api/projects", this.setProject);

    this.app.get("/", (req: Request, res: Response) => {
      res.status(200).send(`API Isaac Portfolio ${this.API_VERSION}`);
    });
  }

  get isDev(): boolean {
    return this.ISDEV;
  }

  start() {
    this.app.listen(this.PORT, () => {
      console.log("Server is on:", process.env.NODE_ENV);
      console.log(`Server is running on port http://localhost:${this.PORT}.`);
    });
  }
}

import { Request, Response } from "express";
import { checkin } from "../utils/checkin";

const validateCheckIn = async (req: Request, res: Response) => {
  try {
    const filterCheckIn = checkin.filter((element) => {
      return (
        element.order === req.body.orderId &&
        element.cpf === req.body.cpf &&
        element.stateFrom === req.body.stateFrom
      );
    });

    if (filterCheckIn.length < 1) {
      res.status(204).send();
      return false;
    }

    const actualTime = new Date();

    const dateStartCheckIn = new Date(filterCheckIn[0].data.dateStartCheckIn);
    const dateLimitCheckIn = new Date(filterCheckIn[0].data.dateLimitCheckIn);
    // console.log("actualTime", actualTime);
    // console.log("dateStartCheckIn", dateStartCheckIn);
    // console.log("dateLimitCheckIn", dateLimitCheckIn);

    if (actualTime >= dateStartCheckIn && actualTime <= dateLimitCheckIn) {
      res.status(200).json(filterCheckIn);
      return false;
    }

    if (actualTime < dateStartCheckIn) {
      res.status(400).json({
        type: "earlyCheckIn",
        message: `Muito cedo para realizar o check in.`,
        hour: dateStartCheckIn,
      });
      return false;
    }

    if (actualTime > dateLimitCheckIn) {
      res.status(400).json({
        type: "lateCheckIn",
        message:
          "Já passou do horário para check-in, fale com um de nossos atendentes para mais informações",
        hour: dateLimitCheckIn,
      });
      return false;
    }
  } catch (e: any) {
    res.status(500).json({
      message: e.message,
    });
    return false;
  }
};

export { validateCheckIn };

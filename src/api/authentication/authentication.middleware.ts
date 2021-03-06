import { NextFunction, Request, Response } from "express";
import { constants } from "http2";
import * as authenticationService from "../../business/authentication.service";
import { Configuration } from "../../configuration/configuration.models";
import { logger } from "../../utils/logger";

export async function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    const configuration = req.app.locals.configuration as Configuration;

    const token = authenticationService.extractTokenFromHeader(req);
    if (!token) {
      res
        .status(constants.HTTP_STATUS_UNAUTHORIZED)
        .json(JSON.stringify({ error: "token is missing" }))
        .end();
      return;
    }
    const isValid = await authenticationService.verifyToken(token as string, configuration.authentication.publicKeyUrl);

    if (isValid) {
      const authenticatedUser = await authenticationService.getUserFromToken(
        token as string,
        configuration.authentication.authenticatorId
      );
      if (authenticatedUser) {
        res.locals.authenticatedUser = authenticatedUser;
        next();
      } else {
        res
          .status(constants.HTTP_STATUS_UNAUTHORIZED)
          .json(JSON.stringify({ error: "user not found" }))
          .end();
      }
    } else {
      res
        .status(constants.HTTP_STATUS_UNAUTHORIZED)
        .json(JSON.stringify({ error: "token is invalid" }))
        .end();
    }
  } catch (error) {
    logger.error(error);
    res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).end();
  }
}

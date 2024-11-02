import { HttpExceptions } from "@/http/HttpExceptions";
import { findAnimes, findAnimeById, findAnimeByTitle, findAnimeWithLimit } from "@core/services/anime.service";
import { Request, Response, NextFunction } from "express";

export const getAnimes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const animes = await findAnimes();
    if (animes.length < 0 || animes.length == 0) {
      res.status(400).json({ status: "BAD REQUEST", statusCode: 400, message: "There's no anime data!" });
      throw new HttpExceptions({ status: 400, message: "BAD REQUEST", context: { problems: "There's no anime data!" } })
    }

    return res.status(200).json({ status: "OK", statusCode: 200, message: "Success to GET anime data!", animes });
  } catch (error) {
    next(error)
  }
}

export const getAnimeById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: animeId } = req.params;
    const anime = await findAnimeById(animeId);
    if (!anime) {
      return res.status(400).json({ status: "BAD REQUEST", statusCode: 400, message: `There's no anime data with id:${animeId}` });
    }
    return res.status(200).json({ status: "OK", statusCode: 200, message: `Success to GET anime with id:${animeId}`, anime });
  } catch (error) {
    next(error)
  }
}

import Departments from "../models/Departments.js";
import Positions from "../models/Positions.js";
import { Op } from "sequelize";

export const getPositions = async (req, res) => {
  try {
    const positions = await Positions.findAll({
      include: [
        {
          model: Departments,
        },
      ],
    });
    if (positions.length > 0) {
      res.status(200).json({ positions });
    } else {
      res.status(204).json({
        message: "No data available",
      });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const getOnePosition = async (req, res) => {
  try {
    const position = await Positions.findAll({
      where: {
        id: req.params.id,
      },
      include: Departments,
    });
    if (position.length > 0) {
      res.status(200).json({ data: position });
    } else {
      res.status(204).json({
        message: "No data available",
      });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const searchPosition = async (req, res) => {
  try {
    const positions = await Positions.findAll({
      include: Departments,
      where: {
        name: {
          [Op.like]: `%${req.body.search}%`,
        },
      },
    });
    if (positions.length > 0) {
      res.status(200).json({ data: positions });
    } else {
      res.status(204).json({
        message: "No data available",
      });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const addPositions = async (req, res) => {
  try {
    const positions = await Positions.bulkCreate(req.body);
    res.status(201).json({ message: "Position added successfully" });
  } catch (error) {
    res.status(422).json({ message: error });
  }
};

export const updatePositions = async (req, res) => {
  try {
    await Positions.update(
      {
        name: req.body.name,
        status: req.body.status,
        level: req.body.level,
        departmentId: req.body.departmentId,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ message: "Positions updated successfully" });
  } catch (error) {
    res.status(422).json({ message: error });
  }
};

export const deletePositions = async (req, res) => {
  try {
    await Positions.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: "Position deleted successfully" });
  } catch (error) {
    res.status(422).json({ message: error });
  }
};

export const multipleDeletePositions = async (req, res) => {
  try {
    await Positions.destroy({
      where: {
        positionId: req.body.id,
      },
    });
    res.status(200).json({ message: "Positions deleted successfully" });
  } catch (error) {
    res.status(422).json({ message: error });
  }
};

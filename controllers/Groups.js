import Groups from "../models/Groups.js";
import { Op } from "sequelize";

export const getGroups = async (req, res) => {
  try {
    const groups = await Groups.findAll();
    if (groups.length > 0) {
      res.status(200).json({ data: groups });
    } else {
      res.status(204).json({ message: "No data available" });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const getOneGroups = async (req, res) => {
  try {
    const group = await Groups.findAll({
      where: {
        id: req.params.id,
      },
    });
    if (group.length > 0) {
      res.status(200).json({ data: group });
    } else {
      res.status(204).json({
        message: "No data available",
      });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const searchGroup = async (req, res) => {
  try {
    const groups = await Groups.findAll({
      where: {
        description: {
          [Op.like]: `%${req.body.search}%`,
        },
      },
    });
    if (groups.length > 0) {
      res.status(200).json({ data: groups });
    } else {
      res.status(204).json({
        message: "No data available",
      });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const addGroups = async (req, res) => {
  try {
    await Groups.bulkCreate([req.body]);
    res.status(201).json({ message: "Group added succesfully" });
  } catch (error) {
    res.status(422).json({ message: error });
  }
};

export const updateGroups = async (req, res) => {
  try {
    await Groups.update(
      {
        description: req.body.description,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ message: "Groups updated successfully" });
  } catch (error) {
    res.status(422).json({ message: error });
  }
};

export const deleteGroups = async (req, res) => {
  try {
    await Groups.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: "Group deleted successfully" });
  } catch (error) {
    res.status(422).json({ message: error });
  }
};

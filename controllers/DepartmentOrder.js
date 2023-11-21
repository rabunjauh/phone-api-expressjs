import DepartmentOrder from "../models/DepartmentOrder.js";
import { Op } from "sequelize";

export const getDepartmentOrder = async (req, res) => {
  try {
    const departmentOrder = await DepartmentOrder.findAll();
    if (groups.length > 0) {
      res.status(200).json({ data: departmentOrder });
    } else {
      res.status(404).json({ message: "No data available" });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const getOneDepartmentOrder = async (req, res) => {
  try {
    const departmentOrder = await DepartmentOrder.findAll({
      where: {
        id: req.params.id,
      },
    });
    if (departmentOrder.length > 0) {
      res.status(200).json({ data: departmentOrder });
    } else {
      res.status(204).json({
        message: "No data available",
      });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const searchDepartmentOrder = async (req, res) => {
  console.log(req.body);
  // try {
  //   const groups = await Groups.findAll({
  //     where: {
  //       description: {
  //         [Op.like]: `%${req.body.search}%`,
  //       },
  //     },
  //   });
  //   if (groups.length > 0) {
  //     res.status(200).json({ data: groups });
  //   } else {
  //     res.status(204).json({
  //       message: "No data available",
  //     });
  //   }
  // } catch (error) {
  //   res.status(404).json({ message: error });
  // }
};

export const addDeparmentOrder = async (req, res) => {
  try {
    await DepartmentOrder.create(req.body);
    res.status(201).json({ message: "Group added succesfully" });
  } catch (error) {
    res.status(422).json({ message: error });
  }
};

export const updateDepartmentOrder = async (req, res) => {
  try {
    await DepartmentOrder.update(
      {
        order: req.body.description,
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

export const deleteDepartmentOrder = async (req, res) => {
  try {
    await DepartmentOrder.destroy({
      where: {
        id: [req.params.id],
      },
    });
    res.status(200).json({ message: "Group deleted successfully" });
  } catch (error) {
    res.status(422).json({ message: error });
  }
};

export const multipleDeleteDepartmentOrder = async (req, res) => {
  try {
    await DepartmentOrder.destroy({
      where: {
        id: req.body.id,
      },
    });
    res.status(200).json({ message: "Groups deleted successfully" });
  } catch (error) {
    res.status(422).json({ message: error });
  }
};

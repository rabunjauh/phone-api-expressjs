import Departments from "../models/Departments.js";
import { Op } from "sequelize";
import Groups from "../models/Groups.js";

export const getDepartments = async (req, res) => {
  try {
    const departments = await Departments.findAll({
      include: [
        {
          model: Groups,
        },
      ],
    });
    if (departments.length > 0) {
      res.status(200).json({ data: departments });
    } else {
      res.status(204).json({
        message: "No data available",
      });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const getOneDepartment = async (req, res) => {
  try {
    const department = await Departments.findAll({
      where: {
        departmentId: req.params.id,
      },
    });
    if (department.length > 0) {
      res.status(200).json({ data: department });
    } else {
      res.status(204).json({
        message: "No data available",
      });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const searchDepartment = async (req, res) => {
  try {
    const departments = await Departments.findAll({
      where: {
        name: {
          [Op.like]: req.body.search,
        },
      },
    });
    if (departments.length > 0) {
      res.status(200).json({ data: departments });
    } else {
      res.status(204).json({
        message: "No data available",
      });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const addDepartments = async (req, res) => {
  try {
    await Departments.bulkCreate(req.body);
    res.status(201).json({ message: "Department added succesfully" });
  } catch (error) {
    res.status(422).json({ message: error });
  }
};

export const updateDepartment = async (req, res) => {
  try {
    await Departments.update(
      {
        name: req.body.name,
        status: req.body.status,
        order: req.body.order,
        groupId: req.body.groupId,
      },
      {
        where: {
          departmentId: req.params.id,
        },
      }
    );
    res.status(200).json({ message: "Department updated successfully" });
  } catch (error) {
    res.status(422).json({ message: error });
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    await Departments.destroy({
      where: {
        departmentId: req.params.id,
      },
    });
    res.status(200).json({ message: "Department deleted successfully" });
  } catch (error) {
    res.status(422).json({ message: error });
  }
};

export const multipleDeleteDepartments = async (req, res) => {
  try {
    await Departments.destroy({
      where: {
        departmentId: req.body.id,
      },
    });
    res.status(200).json({ message: "Departments deleted successfully" });
  } catch (error) {
    res.status(422).json({ message: error });
  }
};

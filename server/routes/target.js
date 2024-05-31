import express from "express";
import TargetModel from "../models/Targets.js";
import { AdminAuthModel, UserAuthModel } from '../models/Auth.js';

const router = express.Router();

router.get("/read", async(req, res) => {
    const {userID} = req.query;
    let userTargets;
    
    try {
        const user = await UserAuthModel.findOne({_id : userID});

        if (user) {
            const response = await TargetModel.findOne({userID});
            userTargets = response
        }
        res.json({userTargets}); 
        
    } catch (error) {
        console.error(error)
        res.json("Error reading targets");
    }
});


router.post("/create", async (req, res) => {
    const {userID, title, note, value} = req.body;
    const goalDetail = {title, note, value}

    const target = await TargetModel.findOne({userID});
    const user = await UserAuthModel.findOne({_id : userID});

    if (user) {
        if(!target) {
            try {
                const target = new TargetModel({
                    userID: user._id,
                    goals: [goalDetail]
                });
                await target.save(); 

                res.json({
                    message: "Target saved successfully",
                    color: "green"
                }); 
            } catch (error) {
                console.error(error);
                res.json({
                    message: "Error saving target",
                    color: "red"
                });
            }
        } else if (target) {
            if(target.goals.length < 6) {
                try {
                    const target = await TargetModel.findOne({userID});
                    target.goals.push(goalDetail);
                    await target.save(); 
        
                    res.json({
                        message: "Target saved successfully",
                        color: "green",
                        goalDetail
                    });
                } catch (error) {
                    console.error(error);
                    res.json({
                        message: "Error saving target",
                        color: "red",
                    });
                } 
            } else {
                res.json({
                    message: "Maximum Number of Targets",
                    color: "red"
                });
            }
        }   
    } else {
        res.json({
            message: "User not found",
            color: "red",
        });  
    }
});


router.put("/update", async (req, res)=> {
    const {userID, goalID, value} = req.body;
    const user = await UserAuthModel.findOne({_id : userID}); 

    if(user) {
        const userTargets = await TargetModel.findOne({userID});
        if (userID && goalID && value) {     
            try {
                const targetGoalIndex = userTargets.goals.findIndex(goal => goal._id.toString() === goalID);
                console.log({targetGoalIndex});

                if (targetGoalIndex === -1) {
                    return res.json({
                        message: "Goal not found",
                        color: "red"
                    });
                }
                userTargets.goals[targetGoalIndex].value = value;
                await userTargets.save();

                res.json({
                    message: "Target updated successfully",
                    color: "green"
                });            
            } catch (error) {
                console.error(error);
                res.json({
                    message: "Failed to update Target, Internal server error",
                    color: "red"
                });
            }
        } else {
            res.json({
                message: "Failed to update Target",
                color: "red"
            });
        }        
    } else {
        res.json({
            message: "User does not exist",
            color: "red"
        });
    }
});


router.delete("/delete", async (req, res) =>{
    const {userID, goalID} = req.body;
    const user = await UserAuthModel.findOne({_id : userID}); ;

    if(user) {
        const userTargets = await TargetModel.findOne({userID});
        if (userID && goalID) {     
            try {
                const targetGoalIndex = userTargets.goals.findIndex(goal => goal._id.toString() === goalID);
                console.log({targetGoalIndex});

                if (targetGoalIndex === -1) {
                    return res.json({
                        message: "Goal not found",
                        color: "red"
                    });
                }
                userTargets.goals.splice(targetGoalIndex, 1);
                await userTargets.save()

                res.json({
                    message: "Target deleted successfully",
                    color: "green"
                });            
            } catch (error) {
                console.error(error);
                res.json({
                    message: "Failed to delete Target, Internal server error",
                    color: "red"
                });
            }
        } else {
            res.json({
                message: "Failed to delete Target",
                color: "red"
            });
        }        
    } else {
        res.json({
            message: "User does not exist",
            color: "red"
        });
    }
});

export {router as targetRouter};
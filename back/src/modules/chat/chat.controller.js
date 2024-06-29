import { spawn } from 'child_process';
import chatModel from "../../../DB/models/Chat.model.js";
import { AppError } from '../../utils/AppError.js';

const prediction = (SymptomPara) => {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('C:/Users/Msys/AppData/Local/Programs/Python/Python312/python.exe', ['python-script.py', SymptomPara]);

        let result = '';

        pythonProcess.stdout.on('data', (data) => {
            result += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            reject(data.toString());
        });

        pythonProcess.on('close', (code) => {
            if (code !== 0) {
                reject(`Python process exited with code ${code}`);
            } else {
                result = result.replace(/[\r\n]/g, '');
                resolve(result);
            }
        }); 
    });
};




export const create = async (req, res, next) => {
    try {
        let { message } = req.body;

        if (!message) {
            return next(new AppError(`Message is required`,400));
        }

        const newChat = new chatModel({ message });
        await newChat.save();
        
        let result = await prediction(newChat.message); // Await the prediction result
        req.body.medicine = result;
        req.body.createdBy = req.user._id;
        //console.log(result);
        return res.status(201).json({ message: "success", Disease : result });

    } catch (error) { 
        console.error('Error saving chat message:', error);
        res.status(500).json({ error: error.toString() });
    }
};

import cors from 'cors';
import connectDB from '../DB/connect.js';
import categoryRouter from './modules/categories/categories.router.js';
import authRouter from './modules/auth/auth.router.js';
import userRouter from './modules/user/user.router.js';
import productRouter from './modules/products/products.router.js';
import cartRouter from './modules/cart/cart.router.js';
import chatRouter from './modules/chat/chat.router.js';
import orderRouter from './modules/order/order.router.js';



const initApp = (app, express) => {
    connectDB();
    app.use(cors());
    app.use(express.json());
    app.get('/', (req, res) => {
            return res.status(200).json({ message: "welcome" });
    })
    app.use('/auth',authRouter);
    app.use('/categories',categoryRouter);
    app.use('/products',productRouter);
    app.use('/users',userRouter);
    app.use('/cart',cartRouter);
    app.use('/chat',chatRouter); 
    app.use('/order',orderRouter); 


    app.use('*', (req, res) => {
            return res.status(404).json({ message: "page not found" });
        });

    app.use((err, req, res, next)=>{
        res.status(err.statusCode).json({message:err.message});
    });
    
    }
    
    export default initApp;  
    
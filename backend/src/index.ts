import express from 'express'
import cors from 'cors'
import userRoutes from './routes/user.js'
import mailRoutes from './routes/mail.js'

const app =express()

app.use(cors())
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/mail', mailRoutes);


app.get('/',(req,res)=>{
    res.send('hii')
})

app.listen(3000);


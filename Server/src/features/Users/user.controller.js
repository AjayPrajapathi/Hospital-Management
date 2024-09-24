
export const userRegistration = async(req, res, next)=>{
    let { password } = req.body;
    password = await bcrypt.hash(password, 12);
    const resp = await registerUser({...req.body, password})
    if (resp.success) {
        res.status(201).json({
          success: true,
          msg: "user registeration successful",
          res: resp.res,
        });
    }
}
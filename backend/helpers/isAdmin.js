module.exports = {
    isUser: (req, res, next) => {
        if(req.isAuthenticated()) {
            //res.json("Authorized")
            return next()
        }
        res.status(401).json("FOUDASI")
    },

    isStudent: (req, res, next) => {
        if(req.isAuthenticated() && req.user.isTeacher == false) {
            return next()
        }
        req.flash('error_msg', 'Por favor, crie uma conta ou faça o login.')
        res.redirect('/')
    },

    isTeacher: (req, res, next) => {
        if(req.isAuthenticated() && req.user.isTeacher == true) {
            return next()
        }
        req.flash('error_msg', 'Você deve criar um perfil de Professor para acessar esta função.')
        res.redirect('/')
    }
}
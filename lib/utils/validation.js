module.exports = {
    email: function (val)
    {
        return val.match(/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/);
    },
    tel: function (val)
    {
        return val.match(/^(0[0-9]{1,4}[-]?)?[0-9]{1,4}[-]?[0-9]{4}$/);
    },
    password: function (val)
    {
        return val.length > 7
    }
};

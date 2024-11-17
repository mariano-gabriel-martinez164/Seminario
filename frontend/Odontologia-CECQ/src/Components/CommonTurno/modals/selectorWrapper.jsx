import TextField from "@mui/material/TextField";

function SelectorWrapper({ children, defaultValue, placeholder, required=false, sx={} }) {

    if (required) {
        return (
            <>{children}</>
        );
    } 
    
    else {
        return (
            <TextField
                sx={{width: '100%',...sx}}
                variant="standard"
                value={defaultValue}
                placeholder={placeholder}
                label={placeholder}
                slotProps ={{
                    input:{readOnly: true},
                    inputLabel: {shrink: defaultValue != null && defaultValue != ''},

                }}
            />
        );
    }
}

export { SelectorWrapper };
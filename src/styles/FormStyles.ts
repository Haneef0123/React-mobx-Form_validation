import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: theme.spacing(4),
    },
    input: {
      margin: theme.spacing(1),
      width: '300px',
    },
    button: {
      margin: theme.spacing(2),
    },
  })
);

export default useStyles;

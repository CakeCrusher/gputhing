import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme: any) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    // center the conent vertically and horizontally
    justifyContent: 'center',
    alignItems: 'center',
    // make the container take up the entire screen
    height: '100vh',
    // make the container take up the entire screen
    width: '100vw',
    
  },
  inputsAndDataWrapper: {
    display: 'flex',
    width: '100vw',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  inputAndDataContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: "30vw",
    justifyContent: 'center',
    alignItems: 'center',
    // border: '1px solid black',
  },
  details: {
    width: '100%',
  },
  videoWrapper: {
    display: 'flex',
    width: '100vw',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 0,
    margin: 0
  },
  videoContainer: {
    position: 'relative',
    backgroundColor: 'blue',
    overflow: 'hidden',
  },
  videoIframe: {
    position: 'relative',
  }

}));

export default useStyles;
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded';
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded';
import CircularProgress, {
    CircularProgressProps,
} from '@mui/material/CircularProgress';
import Drawer from '@mui/material/Drawer';
import { AnimatePresence, motion } from 'framer-motion';
import PlayList from '@/components/list/playList/PlayList';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import PlayDetail from '@/views/playDetail/PlayDetail';
import CurrentSongs from './CurrentSongs';
import { Toggle } from '../toggle/Toggle';

import style from './css/player.module.less';
import { connect } from 'react-redux';
import { TracksInt } from '@/types/playList';
import { changeSong } from '@/redux/actionCreator/PlayList';
import { getTime } from '@/untils/filters';
import { eventBus } from '@/untils/eventBus';

// const PlayDetail = React.lazy(() => import('@/views/playDetail/PlayDetail'));

const WallPaper = styled('div')({
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    overflow: 'hidden',
    // background: 'linear-gradient(rgb(255, 38, 142) 0%, rgb(255, 105, 79) 100%)',
    transition: 'all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s',
    '&:before': {
        content: '""',
        width: '140%',
        height: '140%',
        position: 'absolute',
        top: '-40%',
        right: '-50%',
        background:
            'radial-gradient(at center center, rgb(62, 79, 249) 0%, rgba(62, 79, 249, 0) 64%)',
    },
    '&:after': {
        content: '""',
        width: '140%',
        height: '140%',
        position: 'absolute',
        bottom: '-50%',
        left: '-30%',
        background:
            'radial-gradient(at center center, rgb(247, 237, 225) 0%, rgba(247, 237, 225, 0) 70%)',
        transform: 'rotate(30deg)',
    },
});

const Widget = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 4,
    borderRadius: 16,
    width: '100%',
    height: '100%',
    maxWidth: '100%',
    margin: 'auto',
    position: 'relative',
    zIndex: 1,
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(0,0,0,0.6)'
            : 'rgba(255,255,255,0.4)',
    backdropFilter: 'blur(40px)',
}));

const TinyText = styled(Typography)({
    fontSize: '0.75rem',
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
});

const CoverImage = styled('div')({
    width: 100,
    height: 100,
    objectFit: 'cover',
    overflow: 'hidden',
    flexShrink: 0,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.08)',
    '& > img': {
        width: '100%',
    },
});

interface PlayerPropInit {
    isPhone: boolean;
    currentSong: TracksInt;
    currentPlaySongs: TracksInt[];
    changeSong: (data: TracksInt) => void;
}

interface audioInt {
    current: currentInt;
}

interface currentInt {
    play: () => void;
    pause: () => void;
    currentTime: number | number[];
}

interface SongInfoInt {
    showDetailDrawer: () => void;
}

function CircularProgressWithLabel(
    props: CircularProgressProps & { value: number } & {
        children: React.ReactNode;
    } & { pause: () => void },
) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" value={props.value} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                onClick={() => props.pause()}
            >
                {props.children}
            </Box>
        </Box>
    );
}

function Player({
    isPhone,
    currentSong,
    currentPlaySongs,
    changeSong,
}: PlayerPropInit) {
    const theme = useTheme();
    const [duration, setDuration] = React.useState<number>(0); // seconds
    const [position, setPosition] = React.useState<number>(0);
    const [paused, setPaused] = React.useState(false);
    const audio = React.useRef<HTMLAudioElement>(
        null as unknown as HTMLAudioElement,
    );
    const [openPlayer, setOpenPlayer] = React.useState<boolean>(false);
    const [songsDraw, setSongsDraw] = React.useState<boolean>(false);

    const pausedControl = () => {
        setPaused(!paused);
        if (paused) {
            audio.current.pause();
        } else {
            audio.current.play();
        }
    };
    React.useEffect(() => {
        if (currentSong.url) {
            setPaused(true);
            setPosition(0);
            setDuration(Math.ceil(currentSong.dt / 1000));
        }
    }, [currentSong.url]);

    const updateCurrenTime = () => {
        setPosition(Math.floor(audio.current.currentTime as number));
        const time = getTime(audio.current.currentTime, true, 1000);
        eventBus.emit('updateCurrenTime', time);
    };
    const playEnd = () => {
        changeSong(getNextSong());
    };
    const getNextSong = () => {
        let index = currentPlaySongs.findIndex(
            (item) => item.id === currentSong.id,
        );
        if (index + 1 === currentPlaySongs.length) {
            index = 0;
        } else {
            index = index + 1;
        }
        return currentPlaySongs[index];
    };

    const handleVolumeChange = (event: Event) => {
        const target = event.target as EventTarget;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        audio.current.volume = (target.value / 100) as number;
    };
    function formatDuration(value: number) {
        const minute = Math.floor(value / 60);
        const secondLeft = value - minute * 60;
        return `${minute}:${secondLeft < 9 ? `0${secondLeft}` : secondLeft}`;
    }
    const mainIconColor = theme.palette.mode === 'dark' ? '#fff' : '#000';
    const lightIconColor =
        theme.palette.mode === 'dark'
            ? 'rgba(255,255,255,0.4)'
            : 'rgba(0,0,0,0.4)';

    const playBtn = (
        <IconButton
            className={style.player_btn}
            aria-label={paused ? 'play' : 'pause'}
        >
            {paused ? (
                <PauseRounded
                    sx={{ fontSize: '1.8rem' }}
                    htmlColor={mainIconColor}
                />
            ) : (
                <PlayArrowRounded
                    sx={{ fontSize: '1.8rem' }}
                    htmlColor={mainIconColor}
                />
            )}
        </IconButton>
    );

    const SongInfo = (props: SongInfoInt) => (
        <div
            style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                marginLeft: '15px',
            }}
        >
            <CoverImage
                style={{
                    width: '70px',
                    height: '70px',
                }}
                onClick={() => props.showDetailDrawer()}
            >
                <img
                    className={style.player_img}
                    alt="can't win - Chilling Sunday"
                    src={currentSong.al?.picUrl}
                />
            </CoverImage>
            <Box sx={{ ml: 2 }}>
                <Typography
                    variant="caption"
                    color="text.secondary"
                    fontWeight={500}
                >
                    {currentSong.ar?.map((item) => (
                        <span key={item.id}>{item.name}</span>
                    ))}
                </Typography>

                <Typography noWrap letterSpacing={-0.25}>
                    {currentSong.name ? currentSong.name : '播放音乐'}
                </Typography>
            </Box>
        </div>
    );
    const toggleDrawer = () => {
        console.log(currentSong);
        if (JSON.stringify(currentSong) !== '{}') {
            setOpenPlayer(!openPlayer);
        }
    };
    return (
        <Box sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
            <AnimatePresence>
                {!isPhone && (
                    <motion.div
                        style={{ overflow: 'hidden' }}
                        key="modal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Widget>
                            <SongInfo
                                showDetailDrawer={toggleDrawer}
                            ></SongInfo>
                            <div style={{ textAlign: 'center' }}>
                                <div>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <IconButton
                                            aria-label="previous song"
                                            className={style.player_btn}
                                        >
                                            <FastRewindRounded
                                                fontSize="large"
                                                htmlColor={mainIconColor}
                                            />
                                        </IconButton>
                                        <IconButton
                                            aria-label="previous song"
                                            className={style.player_btn}
                                        >
                                            <FastRewindRounded
                                                fontSize="large"
                                                htmlColor={mainIconColor}
                                            />
                                        </IconButton>
                                        <IconButton
                                            className={style.player_btn}
                                            aria-label={
                                                paused ? 'play' : 'pause'
                                            }
                                            onClick={pausedControl}
                                        >
                                            {paused ? (
                                                <PauseRounded
                                                    sx={{ fontSize: '3rem' }}
                                                    htmlColor={mainIconColor}
                                                />
                                            ) : (
                                                <PlayArrowRounded
                                                    sx={{ fontSize: '3rem' }}
                                                    htmlColor={mainIconColor}
                                                />
                                            )}
                                        </IconButton>
                                        <IconButton
                                            className={style.player_btn}
                                            aria-label="next song"
                                        >
                                            <FastForwardRounded
                                                fontSize="large"
                                                htmlColor={mainIconColor}
                                            />
                                        </IconButton>
                                        <IconButton
                                            className={style.player_btn}
                                            aria-label="next song"
                                        >
                                            <FastForwardRounded
                                                fontSize="large"
                                                htmlColor={mainIconColor}
                                            />
                                        </IconButton>
                                    </Box>
                                </div>
                                <div className={style.player_slider}>
                                    <Slider
                                        aria-label="time-indicator"
                                        size="small"
                                        value={position}
                                        min={0}
                                        step={1}
                                        max={duration}
                                        onChange={(_, value) =>
                                            (audio.current.currentTime =
                                                value as number)
                                        }
                                        sx={{
                                            color:
                                                theme.palette.mode === 'dark'
                                                    ? '#fff'
                                                    : 'rgba(0,0,0,0.87)',
                                            height: 4,
                                            '& .MuiSlider-thumb': {
                                                width: 8,
                                                height: 8,
                                                transition:
                                                    '0.3s cubic-bezier(.47,1.64,.41,.8)',
                                                '&:before': {
                                                    boxShadow:
                                                        '0 2px 12px 0 rgba(0,0,0,0.4)',
                                                },
                                                '&:hover, &.Mui-focusVisible': {
                                                    boxShadow: `0px 0px 0px 8px ${
                                                        theme.palette.mode ===
                                                        'dark'
                                                            ? 'rgb(255 255 255 / 16%)'
                                                            : 'rgb(0 0 0 / 16%)'
                                                    }`,
                                                },
                                                '&.Mui-active': {
                                                    width: 20,
                                                    height: 20,
                                                },
                                            },
                                            '& .MuiSlider-rail': {
                                                opacity: 0.28,
                                            },
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            mt: -2,
                                        }}
                                    >
                                        <TinyText>
                                            {formatDuration(position)}
                                        </TinyText>
                                        <TinyText>
                                            -
                                            {formatDuration(
                                                duration - position,
                                            )}
                                        </TinyText>
                                    </Box>
                                </div>
                            </div>

                            <div
                                style={{
                                    display: 'flex',
                                    flex: 1,
                                    justifyContent: 'flex-end',
                                    paddingRight: '20px',
                                }}
                            >
                                <Stack
                                    spacing={2}
                                    direction="row"
                                    sx={{ mb: 1, px: 1, width: '180px' }}
                                    alignItems="center"
                                >
                                    <VolumeDownRounded
                                        htmlColor={lightIconColor}
                                    />
                                    <Slider
                                        aria-label="Volume"
                                        defaultValue={100}
                                        onChange={handleVolumeChange}
                                        sx={{
                                            color:
                                                theme.palette.mode === 'dark'
                                                    ? '#fff'
                                                    : 'rgba(0,0,0,0.87)',
                                            '& .MuiSlider-track': {
                                                border: 'none',
                                            },
                                            '& .MuiSlider-thumb': {
                                                width: 24,
                                                height: 24,
                                                backgroundColor: '#fff',
                                                '&:before': {
                                                    boxShadow:
                                                        '0 4px 8px rgba(0,0,0,0.4)',
                                                },
                                                '&:hover, &.Mui-focusVisible, &.Mui-active':
                                                    {
                                                        boxShadow: 'none',
                                                    },
                                            },
                                        }}
                                    />
                                    <IconButton aria-label="previous song">
                                        <VolumeUpRounded
                                            htmlColor={lightIconColor}
                                        />
                                    </IconButton>
                                </Stack>
                                <MenuOpenIcon
                                    style={{
                                        fontSize: '40px',
                                        marginLeft: '15px',
                                    }}
                                    onClick={() => setSongsDraw(true)}
                                ></MenuOpenIcon>
                            </div>
                        </Widget>
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {isPhone && (
                    <motion.div
                        style={{ overflow: 'hidden' }}
                        key="modal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Widget
                            style={{
                                flexDirection: 'row',
                                // alignItems: 'flex-start',
                                justifyContent: 'space-between',
                            }}
                        >
                            <SongInfo
                                showDetailDrawer={toggleDrawer}
                            ></SongInfo>
                            <div className={style.player_play}>
                                <CircularProgressWithLabel
                                    value={(position / duration) * 100}
                                    children={playBtn}
                                    pause={pausedControl}
                                ></CircularProgressWithLabel>

                                <Toggle></Toggle>
                            </div>
                        </Widget>
                    </motion.div>
                )}
            </AnimatePresence>
            <WallPaper />
            <Drawer
                sx={{
                    width: '100vw',
                    height: '98vh',
                    '& .MuiPaper-elevation16': {
                        height: '98vh',
                    },
                }}
                anchor="bottom"
                open={openPlayer}
                onClose={toggleDrawer}
            >
                <PlayDetail></PlayDetail>
            </Drawer>
            <Drawer
                anchor="right"
                open={songsDraw}
                onClose={() => setSongsDraw(false)}
            >
                <div style={{ width: '600px' }}>
                    <CurrentSongs></CurrentSongs>
                </div>
            </Drawer>
            <audio
                ref={audio}
                src={currentSong.url}
                autoPlay={true}
                onTimeUpdate={updateCurrenTime}
                onEnded={playEnd}
            ></audio>
        </Box>
    );
}

const mapStateToProps = function (store: any) {
    return {
        isPhone: store.UserReducer.isPhone,
        currentSong: store.PlayListReducer.currentSong,
        currentPlaySongs: store.PlayListReducer.currentPlaySongs,
    };
};

const mapDispatchToProps = {
    changeSong,
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);

import * as React from 'react';
import { motion, useCycle } from 'framer-motion';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { IconButton, SwipeableDrawer } from '@mui/material';
import style from './css/toggle.module.less';

const sidebar = {
    open: {
        clipPath: `circle(700px at 40px 40px)`,
        transition: {
            type: 'spring',
            stiffness: 20,
            restDelta: 2,
        },
    },
    closed: {
        clipPath: 'circle(30px at 40px 40px)',
        transition: {
            delay: 0.5,
            type: 'spring',
            stiffness: 400,
            damping: 40,
        },
    },
};

export const Toggle = () => {
    const [isOpen, toggleOpen] = useCycle(false, true);
    const [height] = React.useState(500);

    return (
        <div>
            <motion.nav
                initial={false}
                animate={isOpen ? 'open' : 'closed'}
                custom={height}
                className={style.page}
            >
                <motion.div
                    className={style.page_background}
                    variants={sidebar}
                />
            </motion.nav>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{
                    padding: '0',
                    marginLeft: '15px',
                }}
                onClick={() => toggleOpen()}
            >
                <MenuOpenIcon
                    style={{
                        fontSize: '40px',
                    }}
                ></MenuOpenIcon>
            </IconButton>
        </div>
    );
};

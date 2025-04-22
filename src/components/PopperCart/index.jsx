import { memo } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Popover } from '@mui/material';
import routes from '~/config/routes';

function PopperCart({ id, open, anchorEl, dataCart, onClose }) {
    return (
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            disableScrollLock
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <Box
                onMouseLeave={onClose}
                sx={{
                    bgcolor: 'background.paper',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: 4,
                    borderRadius: 1,
                    overflow: 'hidden',
                    border: '1px solid #ddd',
                    maxHeight: 400,
                }}
            >
                {dataCart && dataCart.length > 0 ? (
                    <>
                        <Box
                            sx={{
                                padding: '16px',
                                borderBottom: '1px solid #ddd',
                                fontWeight: 500,
                                color: 'text.primary',
                            }}
                        >
                            <Typography variant="body1 uppercase text-xl">Sản phẩm trong giỏ hàng</Typography>
                        </Box>
                        <Box
                            sx={{
                                overflowY: 'auto',
                                maxHeight: 300,
                            }}
                        >
                            {dataCart.map((cart, index) => (
                                <Link
                                    key={cart.id}
                                    to={routes.product.replace(':slug', cart?.product.slug)}
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            padding: '12px 16px',
                                            '&:hover': { bgcolor: 'grey.100' },
                                            transition: 'background-color 0.3s',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 64,
                                                height: 64,
                                                borderRadius: 1,
                                                overflow: 'hidden',
                                                marginRight: 2,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                border: '1px solid #eee',
                                            }}
                                        >
                                            <img
                                                src={cart?.listImage?.[0]?.url}
                                                alt={cart?.listImage?.[0]?.description}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        </Box>
                                        <Box
                                            sx={{
                                                flex: 1,
                                            }}
                                        >
                                            <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>
                                                {cart?.product.name}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{ color: 'text.secondary', marginTop: 0.5 }}
                                            >
                                                Số lượng: {cart.quantity}
                                            </Typography>
                                        </Box>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontWeight: 500,
                                                color: 'error.main',
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            {cart?.product.price.toLocaleString()} ₫
                                        </Typography>
                                    </Box>
                                    {index < dataCart.length - 1 && <Divider />}
                                </Link>
                            ))}
                        </Box>
                        <Box
                            sx={{
                                padding: '16px',
                                borderTop: '1px solid #ddd',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <Typography
                                variant="body1"
                                sx={{
                                    fontWeight: 500,
                                    color: 'text.primary',
                                }}
                            >
                                Tổng tiền
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontWeight: 700,
                                    color: 'error.main',
                                }}
                            >
                                {dataCart.reduce((total, item) => total + item.total, 0).toLocaleString()} ₫
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                padding: '16px',
                                textAlign: 'center',
                                bgcolor: 'error.main',
                                color: 'white',
                                cursor: 'pointer',
                                '&:hover': { bgcolor: 'error.dark' },
                            }}
                        >
                            <Link to={routes.cart}>
                                <Typography variant="body1" sx={{ fontWeight: 500, color: 'white' }}>
                                    Xem giỏ hàng
                                </Typography>
                            </Link>
                        </Box>
                    </>
                ) : (
                    <Box
                        sx={{
                            padding: '20px',
                            textAlign: 'center',
                            color: 'grey.600',
                        }}
                    >
                        <Typography variant="body2">Giỏ hàng của bạn trống</Typography>
                    </Box>
                )}
            </Box>
        </Popover>
    );
}

export default memo(PopperCart);

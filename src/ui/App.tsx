import { useState } from 'react'

import './App.css'

import { 
  Box, createTheme, CssBaseline, List, ListItem, 
  ListItemText, Paper, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, ThemeProvider, Typography, IconButton, 
  ListItemIcon, LinearProgress, Chip, Stack 
} from '@mui/material';
import {
  Wifi, WifiOff, Battery20, Battery50, Battery80, BatteryFull,
  Refresh, Warning, CameraAlt, SatelliteAlt, Traffic, Circle,
  FiberManualRecord, FlashOn, PowerSettingsNew,
  DirectionsCar,
  AddCircle,
  VisibilityOff,
  Visibility
} from '@mui/icons-material';
import PrimarySearchAppBar from './components/header';
import CameraMap from './components/maps';
import BoxCard from './components/BoxCard';


const data = [
  { time: "10:00", failures: 10 },
  { time: "11:00", failures: 20 },
  { time: "12:00", failures: 40 },
];

const cameraUpdates = [
  { id: 1, timestamp: "Mar 5, 2025 - 10:30 AM", status: "Motion detected" },
  { id: 2, timestamp: "Mar 5, 2025 - 09:45 AM", status: "Camera rebooted" },
  { id: 3, timestamp: "Mar 5, 2025 - 08:20 AM", status: "Low battery warning" },
  { id: 4, timestamp: "Mar 5, 2025 - 10:30 AM", status: "Motion detected" },
  { id: 5, timestamp: "Mar 5, 2025 - 09:45 AM", status: "Camera rebooted" },
  { id: 6, timestamp: "Mar 5, 2025 - 08:20 AM", status: "Low battery warning" },
  { id: 7, timestamp: "Mar 5, 2025 - 10:30 AM", status: "Motion detected" },
  { id: 8, timestamp: "Mar 5, 2025 - 09:45 AM", status: "Camera rebooted" },
  { id: 9, timestamp: "Mar 5, 2025 - 08:20 AM", status: "Low battery warning" },
];
const centerLatitude = 18.2167;
const centerLongitude = 42.5050;
const radius = 0.01800; // Smaller radius for tighter circle

const initialCameras = [
  { id: 1, traffic_status: "green", battery_percentage: 85, is_connected: true, latitude: centerLatitude + radius * Math.sin(0), longitude: centerLongitude + radius * Math.cos(0) },
  { id: 2, traffic_status: "red", battery_percentage: 50, is_connected: true, latitude: centerLatitude + radius * Math.sin(Math.PI / 6), longitude: centerLongitude + radius * Math.cos(Math.PI / 6) },
  { id: 3, traffic_status: "green", battery_percentage: 95, is_connected: false, latitude: centerLatitude + radius * Math.sin(Math.PI / 3), longitude: centerLongitude + radius * Math.cos(Math.PI / 3) },
  { id: 4, traffic_status: "red", battery_percentage: 40, is_connected: true, latitude: centerLatitude + radius * Math.sin(Math.PI / 2), longitude: centerLongitude + radius * Math.cos(Math.PI / 2) },
  { id: 5, traffic_status: "green", battery_percentage: 60, is_connected: false, latitude: centerLatitude + radius * Math.sin(2 * Math.PI / 3), longitude: centerLongitude + radius * Math.cos(2 * Math.PI / 3) },
  { id: 6, traffic_status: "red", battery_percentage: 20, is_connected: true, latitude: centerLatitude + radius * Math.sin(5 * Math.PI / 6), longitude: centerLongitude + radius * Math.cos(5 * Math.PI / 6) },
  { id: 7, traffic_status: "green", battery_percentage: 80, is_connected: true, latitude: centerLatitude + radius * Math.sin(Math.PI), longitude: centerLongitude + radius * Math.cos(Math.PI) },
  { id: 8, traffic_status: "red", battery_percentage: 30, is_connected: false, latitude: centerLatitude + radius * Math.sin(7 * Math.PI / 6), longitude: centerLongitude + radius * Math.cos(7 * Math.PI / 6) },
  { id: 9, traffic_status: "green", battery_percentage: 70, is_connected: true, latitude: centerLatitude + radius * Math.sin(4 * Math.PI / 3), longitude: centerLongitude + radius * Math.cos(4 * Math.PI / 3) },
  { id: 10, traffic_status: "red", battery_percentage: 10, is_connected: false, latitude: centerLatitude + radius * Math.sin(3 * Math.PI / 2), longitude: centerLongitude + radius * Math.cos(3 * Math.PI / 2) },
  { id: 11, traffic_status: "green", battery_percentage: 90, is_connected: true, latitude: centerLatitude + radius * Math.sin(5 * Math.PI / 3), longitude: centerLongitude + radius * Math.cos(5 * Math.PI / 3) },
  { id: 12, traffic_status: "red", battery_percentage: 15, is_connected: true, latitude: centerLatitude + radius * Math.sin(11 * Math.PI / 6), longitude: centerLongitude + radius * Math.cos(11 * Math.PI / 6) },
  { id: 13, traffic_status: "green", battery_percentage: 55, is_connected: false, latitude: centerLatitude + radius * Math.sin(Math.PI / 4), longitude: centerLongitude + radius * Math.cos(Math.PI / 4) },
  { id: 14, traffic_status: "red", battery_percentage: 45, is_connected: true, latitude: centerLatitude + radius * Math.sin(3 * Math.PI / 4), longitude: centerLongitude + radius * Math.cos(3 * Math.PI / 4) },
  { id: 15, traffic_status: "green", battery_percentage: 35, is_connected: false, latitude: centerLatitude + radius * Math.sin(7 * Math.PI / 4), longitude: centerLongitude + radius * Math.cos(7 * Math.PI / 4) },
  { id: 16, traffic_status: "green", battery_percentage: 35, is_connected: true, latitude: 18.1884046, longitude: 42.5517714 }
];

function App() {
  const [darkMode] = useState(true);
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
    direction: 'rtl',
  });
  const [cameras, setCameras] = useState(initialCameras);

  const handlePing = (id: number) => {
    setCameras(cams => cams.map(cam => 
      cam.id === id ? {...cam, is_connected: !cam.is_connected} : cam
    ));
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    setCameras(cams => cams.map(cam => 
      cam.id === id ? {...cam, traffic_status: newStatus} : cam
    ));
  };

  const getBatteryIcon = (percentage: number) => {
    if (percentage >= 75) return <BatteryFull fontSize="small" color="success" />;
    if (percentage >= 50) return <Battery80 fontSize="small" color="success" />;
    if (percentage >= 25) return <Battery50 fontSize="small" color="warning" />;
    return <Battery20 fontSize="small" color="error" />;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <PrimarySearchAppBar />
        
        <Box sx={{ p: 3, flex: 1 }}>
  <Box display={'flex'} gap={2} justifyContent="center" sx={{ mb: 4 }}>
    <BoxCard 
      title="عدد الكاميرات" 
      value="15"
      icon={<CameraAlt fontSize="large" />}
      color="linear-gradient(135deg, #3f51b5 30%, #2196f3 90%)"
    />
    <BoxCard 
      title="الكاميرات المتصلة" 
      value="9"
      icon={<Wifi fontSize="large" />}
      color="linear-gradient(135deg, #4caf50 30%, #8bc34a 90%)"
    />
    <BoxCard 
      title="الكاميرات المفتوحة" 
      value="6"
      icon={<Visibility fontSize="large" />}
      color="linear-gradient(135deg, #00c853 30%, #64dd17 90%)"
    />
    <BoxCard 
      title="الكاميرات المغلقة" 
      value="5"
      icon={<VisibilityOff fontSize="large" />}
      color="linear-gradient(135deg, #d50000 30%, #ff1744 90%)"
    />
    <BoxCard 
      title="حالة البطارية" 
      value="65% متوسط"
      icon={<Battery80 fontSize="large" />}
      color="linear-gradient(135deg, #ff9800 30%, #ffc107 90%)"
    />
    <BoxCard 
      title="آخر تحديث" 
      value="قبل 5 دقائق"
      icon={<SatelliteAlt fontSize="large" />}
      color="linear-gradient(135deg, #9c27b0 30%, #e91e63 90%)"
    />
    <BoxCard 
      title="إضافة كاميرا جديدة" 
      value="+"
      icon={<AddCircle fontSize="large" />}
      color="linear-gradient(135deg, #00838f 30%, #00acc1 90%)"
    />
  </Box>


          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            <Box sx={{ flex: 2, minWidth: 800 }}>
              <Paper sx={{ height: 550, mb: 5,p:2}}>
              <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                  خريطه
                </Typography>
                <CameraMap camera={cameras}/>
              </Paper>
              
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                  <Traffic sx={{ ml: 1 }} /> جدول حالة الكاميرات
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>رقم الكاميرا</TableCell>
                        <TableCell>حالة المرور</TableCell>
                        <TableCell>البطارية</TableCell>
                        <TableCell>الاتصال</TableCell>
                        <TableCell>الإجراءات</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cameras.map((camera) => (
                        <TableRow key={camera.id}>
                          <TableCell>#{camera.id}</TableCell>
                          <TableCell>
                            <Chip
                              label={camera.traffic_status === 'green' ? 'أخضر' : 'أحمر'}
                              size="small" sx={{p:2}}
                              color={camera.traffic_status === 'green' ? 'success' : 'error'}
                              icon={<FiberManualRecord fontSize="small" />}
                            />
                          </TableCell>
                          <TableCell>
                            <Stack direction="row" alignItems="center" justifyContent={"left"}  spacing={1} >
                              {getBatteryIcon(camera.battery_percentage)}
                              <LinearProgress 
                                variant="determinate" 
                                value={camera.battery_percentage} 
                                sx={{ 
                                  width: 60,
                                  height: 8,
                                  borderRadius: 5,
                                  backgroundColor: theme.palette.grey[800],
                                  '& .MuiLinearProgress-bar': {
                                    backgroundColor: 
                                      camera.battery_percentage > 50 ? '#4caf50' :
                                      camera.battery_percentage > 20 ? '#ff9800' : '#f44336'
                                  }
                                }}
                              />
                            </Stack>
                          </TableCell>
                          <TableCell align='left'>
                            {camera.is_connected ? (
                              <Chip label="متصل" color="success" size="small" sx={{p:2}}  icon={<Wifi />} />
                            ) : (
                              <Chip label="غير متصل" color="error"  size="small" sx={{p:2}} icon={<WifiOff />} />
                            )}
                          </TableCell>
                          <TableCell >
                            <Stack direction="row" spacing={1} justifyContent={"left"}>
                              <IconButton 
                                size="small" 
                                onClick={() => handlePing(camera.id)}
                                color="primary"
                              >
                                <FlashOn />
                              </IconButton>
                              <IconButton
                                size="small"
                                onClick={() => handleStatusChange(camera.id, 'green')}
                                color="success"
                              >
                                <Circle sx={{ fontSize: 16 }} />
                              </IconButton>
                              <IconButton
                                size="small"
                                onClick={() => handleStatusChange(camera.id, 'red')}
                                color="error"
                              >
                                <Warning sx={{ fontSize: 16 }} />
                              </IconButton>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Box>

            <Paper sx={{ flex: 1, minWidth: 350, p: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <Refresh sx={{ ml: 1 }} /> التحديثات الأخيرة
              </Typography>
              <List dense>
                {cameraUpdates.map((update) => (
                  <ListItem key={update.id} sx={{ py: 0.5 }}>
                    <ListItemText
                      primary={update.status}
                      primaryTypographyProps={{ variant: 'body2' }}
                      secondary={update.timestamp}
                      secondaryTypographyProps={{ variant: 'caption' }}
                      sx={{ textAlign: 'right' }}
                    />
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      {update.status.includes('Motion') ? (
                        <DirectionsCar color="info" />
                      ) : update.status.includes('reboot') ? (
                        <PowerSettingsNew color="warning" />
                      ) : (
                        <Battery20 color="error" />
                      )}
                    </ListItemIcon>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App

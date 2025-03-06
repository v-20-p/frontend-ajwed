import {  Box, Card, CardContent, Stack, Typography } from '@mui/material'
import React from 'react'

interface props{
    title:string
    description:string
}
function BoxCard({ title, value, icon, color }: any) {
    return (
      <Card sx={{ 
        background: color,
        color: 'white', 
        minWidth: 220,
        transition: 'transform 0.2s',
        '&:hover': { transform: 'translateY(-4px)' }
      }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="subtitle1">{title}</Typography>
              <Typography variant="h4" fontWeight="bold">{value}</Typography>
            </Box>
            <Box sx={{ opacity: 0.8 }}>
              {icon}
            </Box>
          </Stack>
        </CardContent>
      </Card>
    )
  }

export default BoxCard
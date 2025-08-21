import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, IconButton, Paper, Typography, Tooltip } from '@mui/material';
import React, { useState, useMemo } from 'react';

const COLORS = {
  empty: '#ebedf0',
  low: '#a5f3ff',
  medium: '#4ac8db',
  high: '#18b4cc',
  veryHigh: '#0d9dc1',
};

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_LABELS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const getColorIntensity = (count) => {
  if (count === 0) return COLORS.empty;
  if (count <= 3) return COLORS.low;
  if (count <= 6) return COLORS.medium;
  if (count <= 9) return COLORS.high;
  return COLORS.veryHigh;
};

const generateCalendarData = (year, month) => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const calendarData = [];
  const dayNumbers = [];
  let dayCounter = 1;
  let nextMonthCounter = 1;

  for (let week = 0; week < 6; week++) {
    const weekData = [];
    const weekDays = [];

    for (let day = 0; day < 7; day++) {
      const cellIndex = week * 7 + day;

      if (cellIndex < firstDay) {
        weekDays.push(daysInPrevMonth - firstDay + day + 1);
        weekData.push(0);
      } else if (dayCounter <= daysInMonth) {
        weekDays.push(dayCounter);
        weekData.push(Math.floor(Math.random() * 13));
        dayCounter++;
      } else {
        weekDays.push(nextMonthCounter);
        weekData.push(0);
        nextMonthCounter++;
      }
    }
    calendarData.push(weekData);
    dayNumbers.push(weekDays);
  }

  return { calendarData, dayNumbers, firstDay, daysInMonth };
};

const TaskCountHeatmap = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const { calendarData, dayNumbers, firstDay, daysInMonth } = useMemo(
    () => generateCalendarData(currentDate.getFullYear(), currentDate.getMonth()),
    [currentDate],
  );

  const totalTasks = useMemo(
    () => calendarData.flat().reduce((sum, count) => sum + count, 0),
    [calendarData],
  );

  const handlePrevMonth = () =>
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1));
  const handleNextMonth = () =>
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1));

  return (
    <Paper sx={{ p: 3, borderRadius: 2, maxWidth: { xs: '100%', md: 600 }, mx: 'auto' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2, gap: 1 }}>
        <IconButton size="small" onClick={handlePrevMonth} aria-label="Previous month">
          <ChevronLeftIcon fontSize="small" />
        </IconButton>
        <Typography sx={{ minWidth: 120, textAlign: 'center', fontSize: 14 }}>
          {MONTH_LABELS[currentDate.getMonth()]} {currentDate.getFullYear()}
        </Typography>
        <IconButton size="small" onClick={handleNextMonth} aria-label="Next month">
          <ChevronRightIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box>
          <Box sx={{ display: 'flex', gap: '3px', mb: '3px' }}>
            {DAY_LABELS.map((day) => (
              <Box key={day} sx={{ width: 30, textAlign: 'center', fontSize: 9, color: '#586069' }}>
                {day}
              </Box>
            ))}
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            {calendarData.map((week, weekIndex) => (
              <Box key={weekIndex} sx={{ display: 'flex', gap: '3px' }}>
                {week.map((taskCount, dayIndex) => {
                  const dayNumber = dayNumbers[weekIndex][dayIndex];
                  const cellIndex = weekIndex * 7 + dayIndex;
                  const isCurrentMonth =
                    cellIndex >= firstDay && cellIndex < firstDay + daysInMonth;

                  return (
                    <Tooltip key={dayIndex} title={isCurrentMonth ? `${taskCount} tasks` : ''}>
                      <Box
                        sx={{
                          width: 30,
                          height: 30,
                          backgroundColor: isCurrentMonth
                            ? getColorIntensity(taskCount)
                            : '#f6f8fa',
                          borderRadius: '3px',
                          cursor: 'pointer',
                          border: '1px solid rgba(27, 31, 35, 0.06)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 11,
                          color: isCurrentMonth ? (taskCount > 6 ? '#fff' : '#24292e') : '#c3c8cf',
                          fontWeight: isCurrentMonth ? 500 : 400,
                          '&:hover': { border: '1px solid rgba(27, 31, 35, 0.3)' },
                        }}
                      >
                        {dayNumber}
                      </Box>
                    </Tooltip>
                  );
                })}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
        <Typography sx={{ fontSize: 11, color: '#586069', mr: 1 }}>Less</Typography>
        {[0, 3, 6, 9, 12].map((level) => (
          <Box
            key={level}
            sx={{
              width: 10,
              height: 10,
              backgroundColor: getColorIntensity(level),
              borderRadius: '2px',
              border: '1px solid rgba(27, 31, 35, 0.06)',
            }}
          />
        ))}
        <Typography sx={{ fontSize: 11, color: '#586069', ml: 1 }}>More</Typography>
      </Box>

      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography sx={{ fontSize: 12, color: '#586069' }}>
          <strong>{totalTasks}</strong> total tasks in {MONTH_LABELS[currentDate.getMonth()]}{' '}
          {currentDate.getFullYear()}
        </Typography>
      </Box>
    </Paper>
  );
};

export default TaskCountHeatmap;

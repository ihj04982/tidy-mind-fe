import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, IconButton, Paper, Typography, useTheme } from '@mui/material';
import React, { useState, useMemo } from 'react';

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
  const theme = useTheme();
  const [currentDate, setCurrentDate] = useState(new Date());

  const COLORS = {
    empty: theme.palette.background.paper,
    low: '#c3cef4',
    medium: '#8ea5e7',
    high: '#5078e5',
    veryHigh: '#0943e5',
  };

  const getColorIntensity = (count) => {
    if (count === 0) return COLORS.empty;
    if (count <= 3) return COLORS.low;
    if (count <= 6) return COLORS.medium;
    if (count <= 9) return COLORS.high;
    return COLORS.veryHigh;
  };

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
    <Paper
      sx={{
        p: 3,
        borderRadius: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2, gap: 1 }}>
        <IconButton size="small" onClick={handlePrevMonth} aria-label="Previous month">
          <ChevronLeftIcon fontSize="small" />
        </IconButton>
        <Typography sx={{ minWidth: 120, textAlign: 'center', fontSize: '0.8rem' }}>
          {MONTH_LABELS[currentDate.getMonth()]} {currentDate.getFullYear()}
        </Typography>
        <IconButton size="small" onClick={handleNextMonth} aria-label="Next month">
          <ChevronRightIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box>
          <Box sx={{ display: 'flex', gap: '0.1875rem', mb: '0.1875rem' }}>
            {DAY_LABELS.map((day) => (
              <Box
                key={day}
                sx={{
                  width: '1.875rem',
                  textAlign: 'center',
                  fontSize: '0.5625rem',
                  color: theme.palette.text.secondary,
                }}
              >
                {day}
              </Box>
            ))}
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.1875rem' }}>
            {calendarData.map((week, weekIndex) => (
              <Box key={weekIndex} sx={{ display: 'flex', gap: '0.1875rem' }}>
                {week.map((taskCount, dayIndex) => {
                  const dayNumber = dayNumbers[weekIndex][dayIndex];
                  const cellIndex = weekIndex * 7 + dayIndex;
                  const isCurrentMonth =
                    cellIndex >= firstDay && cellIndex < firstDay + daysInMonth;

                  return (
                    <Box
                      key={dayIndex}
                      sx={{
                        width: '1.875rem',
                        height: '1.875rem',
                        backgroundColor: isCurrentMonth ? getColorIntensity(taskCount) : '#f6f8fa',
                        borderRadius: '0.1875rem',
                        cursor: 'pointer',
                        border: `1px solid rgba(27, 31, 35, 0.06)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.7rem',
                        color: isCurrentMonth
                          ? taskCount > 6
                            ? theme.palette.background.paper
                            : theme.palette.text.primary
                          : theme.palette.text.secondary,
                        '&:hover': {
                          border: `1px solid rgba(27, 31, 35, 0.3)`,
                        },
                      }}
                    >
                      {dayNumber}
                    </Box>
                  );
                })}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
        <Typography sx={{ fontSize: '0.6875rem', color: theme.palette.text.secondary, mr: 1 }}>
          Less
        </Typography>
        {[0, 3, 6, 9, 12].map((level) => (
          <Box
            key={level}
            sx={{
              width: '0.625rem',
              height: '0.625rem',
              backgroundColor: getColorIntensity(level),
              borderRadius: '0.125rem',
              border: `1px solid rgba(27, 31, 35, 0.06)`,
            }}
          />
        ))}
        <Typography sx={{ fontSize: '0.6875rem', color: theme.palette.text.secondary, ml: 1 }}>
          More
        </Typography>
      </Box>

      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography sx={{ fontSize: '0.75rem', color: theme.palette.text.secondary }}>
          <strong>{totalTasks}</strong> total tasks in {MONTH_LABELS[currentDate.getMonth()]}{' '}
          {currentDate.getFullYear()}
        </Typography>
      </Box>
    </Paper>
  );
};

export default TaskCountHeatmap;

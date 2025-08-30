import { Box, Paper, Typography, useTheme } from '@mui/material';
import React, { useMemo } from 'react';

import { MONTH_LABELS } from '../../../constants/calendar.constants';
import { getColors } from '../../../theme/theme';

const transformDataToGrid = (taskData, year, month) => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const grid = [];

  const safeTaskData = taskData || {};

  for (let week = 0; week < 6; week++) {
    const weekData = [];

    for (let day = 0; day < 7; day++) {
      const cellIndex = week * 7 + day;
      const dayNumber = cellIndex - firstDay + 1;

      if (cellIndex < firstDay || dayNumber > daysInMonth) {
        weekData.push(0);
      } else {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNumber).padStart(2, '0')}`;
        weekData.push(safeTaskData[dateStr] || 0);
      }
    }
    grid.push(weekData);
  }

  return grid;
};

const generateCalendarStructure = (year, month) => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const dayNumbers = [];
  let dayCounter = 1;
  let nextMonthCounter = 1;

  for (let week = 0; week < 6; week++) {
    const weekDays = [];

    for (let day = 0; day < 7; day++) {
      const cellIndex = week * 7 + day;

      if (cellIndex < firstDay) {
        weekDays.push(daysInPrevMonth - firstDay + day + 1);
      } else if (dayCounter <= daysInMonth) {
        weekDays.push(dayCounter);
        dayCounter++;
      } else {
        weekDays.push(nextMonthCounter);
        nextMonthCounter++;
      }
    }
    dayNumbers.push(weekDays);
  }

  return { dayNumbers, firstDay, daysInMonth };
};

const TaskCountHeatmap = ({ statics, currentDate }) => {
  const theme = useTheme();

  const COLORS = getColors(theme.palette.mode);

  const getColorIntensity = (count) => {
    if (count === 0) return COLORS.empty;
    if (count <= 2) return COLORS.low;
    if (count <= 4) return COLORS.medium;
    if (count <= 6) return COLORS.high;
    return COLORS.veryHigh;
  };

  const { dayNumbers, firstDay, daysInMonth } = useMemo(
    () => generateCalendarStructure(currentDate.getFullYear(), currentDate.getMonth()),
    [currentDate],
  );

  const calendarData = useMemo(
    () =>
      transformDataToGrid(statics?.dailyCounts, currentDate.getFullYear(), currentDate.getMonth()),
    [statics?.dailyCounts, currentDate],
  );

  return (
    <Paper
      id="hello"
      sx={{
        p: 3,
        borderRadius: 2,
        width: '100%',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
        <Typography sx={{ minWidth: 120, textAlign: 'center', fontSize: '0.8rem' }}>
          {MONTH_LABELS[currentDate.getMonth()]} {currentDate.getFullYear()}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '0.1875rem',
            }}
          >
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
                        width: '1.25rem',
                        height: '1.25rem',
                        backgroundColor: isCurrentMonth
                          ? getColorIntensity(taskCount)
                          : 'transparent',
                        borderRadius: '0.1875rem',
                        cursor: 'pointer',
                        border: `0.5px solid ${theme.palette.border.strong}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.625rem',
                        color: isCurrentMonth
                          ? taskCount > 6
                            ? theme.palette.text.primary
                            : theme.palette.text.primary
                          : theme.palette.text.secondary,
                        '&:hover': {
                          border: `0.5px solid ${theme.palette.border.default}`,
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

      <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
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
              border: `0.5px solid ${theme.palette.border.strong}`,
            }}
          />
        ))}
        <Typography sx={{ fontSize: '0.6875rem', color: theme.palette.text.secondary, ml: 1 }}>
          More
        </Typography>
      </Box>

      <Box sx={{ mt: 1, textAlign: 'center' }}>
        <Typography sx={{ fontSize: '0.75rem', color: theme.palette.text.secondary }}>
          Total: <strong>{statics.total}</strong> completed!
        </Typography>
      </Box>
    </Paper>
  );
};

export default TaskCountHeatmap;

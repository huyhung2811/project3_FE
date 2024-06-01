import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { scheduleApi } from '../../services/apis/ScheduleApi';
import { format } from 'date-fns';
import "./Schedule.css";
import { useNavigate } from 'react-router-dom';

const convertScheduleToEvents = (scheduleData) => {
    const events = [];

    for (const [date, details] of Object.entries(scheduleData)) {
        if (details.is_holiday) {
            events.push({
                title: details.description,
                start: date,
                allDay: true,
                extendedProps: {
                    is_holiday: true
                }
            });
        }

        details.schedule.forEach((scheduleItem) => {
            events.push({
                title: `${scheduleItem.class_code} - ${scheduleItem.name}`,
                start: `${date}T${scheduleItem.start_time}`,
                end: `${date}T${scheduleItem.end_time}`,
                extendedProps: {
                    class_code: scheduleItem.class_code,
                }
            });
        });
    }

    return events;
};

export default function Schedule() {
    const [events, setEvents] = React.useState();
    const [scheduleInMonth, setScheduleInMonth] = React.useState({});
    const [date, setDate] = React.useState(format(new Date(), 'yyyy-MM-dd'));
    const [month, setMonth] = React.useState(new Date().getMonth());
    const [previousMonthData, setPreviousMonthData] = React.useState({});
    const navigate = useNavigate();

    const fetchScheduleData = async (view, date) => {
        try {
            let res;
            if (view === 'dayGridMonth') {
                res = await scheduleApi.getScheduleInMonth(date);
                setScheduleInMonth(res);
            }
        } catch (err) {
            console.error(err);
        }
    };

    React.useEffect(() => {
        fetchScheduleData('dayGridMonth', date);
    }, [date]);


    React.useEffect(() => {
        if (Object.entries(scheduleInMonth).length !== 0) {
            setEvents(convertScheduleToEvents({ ...scheduleInMonth.schedule_in_month, ...previousMonthData.schedule_in_month }));
        }
    }, [scheduleInMonth, previousMonthData]);
    return (
        <div style={{ width: "100%" }}>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView={'dayGridMonth'}
                headerToolbar={{
                    start: 'prev,next today',
                    center: 'title',
                    end: 'dayGridMonth, timeGridWeek, timeGridDay',
                }}
                locale={'vi'}
                events={events}
                eventColor='#fff'
                eventTimeFormat={{ hour: 'numeric', minute: '2-digit', meridiem: false, hour12: false }}
                eventContent={(arg) => {
                    const isHoliday = arg.event.extendedProps && arg.event.extendedProps.is_holiday;

                    let eventClass = "normal-event";
                    if (isHoliday) {
                        eventClass = "holiday-event";
                    }

                    return (
                        <div className={`event-container ${eventClass}`}>
                            <div className="event-time">{arg.timeText}</div>
                            <div className="event-title">{arg.event.title}</div>
                        </div>
                    );
                }}
                views={{
                    dayGrid: {
                        dayMaxEvents: 2
                    }
                }}
                eventClick={function (info) {
                    //alert('Event: ' + info.event.extendedProps.class_code);
                    navigate(`/course-class/${info.event.extendedProps.class_code}`);
                }}
                eventMouseEnter={
                    function (info) {
                        
                    }
                }
                datesSet={(info) => {
                    const currentView = info.view.type;
                    let day;
                    if (currentView === 'dayGridMonth') {
                        day = format(new Date(info.start.getFullYear(), info.start.getMonth() + 1, 1), 'yyyy-MM-dd');
                    } else if (currentView === 'timeGridWeek') {
                        if (info.start.getMonth() !== info.end.getMonth()) {
                            if (info.start.getMonth() !== month) {
                                day = format(info.start, 'yyyy-MM-dd');
                                setMonth(info.start.getMonth());
                            } else {
                                day = format(info.end, 'yyyy-MM-dd');
                                setMonth(info.end.getMonth());
                            }
                        } else {
                            day = format(info.start, 'yyyy-MM-dd');
                            setMonth(info.start.getMonth());
                        }
                    } else if (currentView === 'timeGridDay') {
                        day = format(new Date(info.start.getFullYear(), info.start.getMonth(), info.start.getDate()), 'yyyy-MM-dd');
                    }
                    setDate(day);
                    setPreviousMonthData(scheduleInMonth);
                }}
            />
        </div>
    );
}

import React from "react";

const labelText = {
    class_code: 'Mã lớp',
    name: "Tên học phần",
    course_code: "Mã học phần",
    number_of_absenses: "Số lần vắng",
    education_format: "Hình thức giáo dục",
    room: "Phòng",
    start_time: "Giờ bắt đầu",
    end_time: "Giờ kết thúc",
    systems: "Hệ",
    system: "Hệ",
    type: "Loại",
    teacher_name: "Giáo viên hướng dẫn",
    students_number: "Số sinh viên",
    semester: "Kỳ học",
    description: "Mô tả",
    school_day: "Ngày học",
    unit: "Đơn vị",
    class_name: "Tên Lớp"
};

const dayOfWeekMap = {
    Monday: 'Thứ 2',
    Tuesday: 'Thứ 3',
    Wednesday: 'Thứ 4',
    Thursday: 'Thứ 5',
    Friday: 'Thứ 6',
    Saturday: 'Thứ 7',
    Sunday: 'Chủ Nhật'
};

function DetailsItem({ label, value }) {
    let displayValue = value;

    switch (label) {
        case 'school_day':
            displayValue = dayOfWeekMap[value] || value;
            break;
        case 'description':
            displayValue = value || 'Chưa có';
            break;
        case 'systems':
            displayValue = (
                <ul>
                    {value.map(system => (
                        <li key={system.id}>{system.name} ({system.enrollment_code})</li>
                    ))}
                </ul>
            );
            break;
        default:
            break;
    }

    return (
        <div className="detail-item" style={{ textAlign: "start" }}>
            <span>
                <p className="detail-label" style={{ color: "#000", fontSize: "16px", fontWeight: "bold" }}>{labelText[label]}</p>
                {label === "systems" ? (
                    <ul>
                        {value.map(system => (
                            <li key={system.id}>{system.name}</li>
                        ))}
                    </ul>
                ) : (
                    <p>{displayValue}</p>
                )}
                {/* <p>{value}</p> */}
            </span>
        </div>
    );
}

export default DetailsItem;

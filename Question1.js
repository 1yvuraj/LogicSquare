const students = [
    { name: "Dhishan Debnath", Roll: 1 },
    { name: "Animesh Gupta", Roll: 2 },
    { name: "Tapas Sen", Roll: 3 },
    { name: "Misti Dutta", Roll: 4 },
    { name: "Chini Misra", Roll: 5 },
  ];
  
  const Details = [
    { Roll: 5, subjects: { math: 35, english: 56, chemistry: 76, computer: 68 } },
    { Roll: 3, subjects: { math: 33, chemistry: 12, computer: 50, english: 35 } },
    { Roll: 1, subjects: { math: 55, english: 75, chemistry: 76, computer: 94 } },
    { Roll: 4, subjects: { english: 12, chemistry: 85, computer: 68, math: 45 } },
    { Roll: 2, subjects: { math: 55, english: 56, computer: 48, chemistry: 12 } },
  ];
  
  function generateStudentMarkSheets(students, Details, passThreshold = 200) {
    const studentsMarkSheets = [];
  
    for (const student of students) {
      const studentDetails = Details.find(detail => detail.Roll === student.Roll);
  
      if (studentDetails) {
        const { subjects, ...otherStudentInfo } = studentDetails;
  
        // Check if subjects object exists and is not empty
        if (subjects && Object.keys(subjects).length > 0) {
          const totalMarks = Object.values(subjects).reduce((acc, mark) => acc + mark, 0);
          const status = totalMarks >= passThreshold ? "pass" : "fail";
  
          studentsMarkSheets.push({
            ...otherStudentInfo,
            ...subjects,
            total: totalMarks,
            status,
          });
        } else {
          console.error("No subjects found for Roll:", student.Roll);
        }
      } else {
        console.error("Student details not found for Roll:", student.Roll);
      }
    }
  
    return studentsMarkSheets;
  }
  
  const studentsMarkSheets = generateStudentMarkSheets(students, Details);
  console.log(studentsMarkSheets);
  
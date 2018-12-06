const baseIp = 'http://localhost';

const baseAccount = baseIp + ':9090/users';
const baseClassroom = baseIp + ':9094/classrooms';
const baseCourse = baseIp + ':9093/courses';
const baseEquipment = baseIp + ':9092/maintains';
const baseFile = baseIp + ':10000/file';
const baseStuff = baseIp + ':9091/stuffs';

module.exports = {
  accountUrl: baseAccount,
  ClassroomUrl: baseClassroom,
  courseUrl: baseCourse,
  equipmentUrl: baseEquipment,
  fileUrl: baseFile,
  stuffUrl: baseStuff
};
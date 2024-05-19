import RenderSteps from "./RenderSteps";


export default function AddCourse() {
    return (
        <div className="flex flex-row gap-4">
            {/* left section for course details and update  */}
            <div className="w-3/4 flex flex-col gap-2">
                <h1 className="text-3xl text-richblack-100">Add Course</h1>
                <div>
                    <RenderSteps/>
                </div>
            </div>

            {/* right section for code of conduct information  */}
            <div className="p-4 text-sm flex flex-col gap-2 w-1/3 text-richblack-100 border-2 border-richblack-500 bg-richblack-700 rounded-lg">
                <p className="text-lg">⚡ Course upload tips</p>
                <ul className="list-disc list-inside">
                    <li>Set the Course Price option or make it free.</li>
                    <li>Standard size for the course thumbnail is 1024x576.</li>
                    <li>Video section controls the course overview video.</li>
                    <li>Course Builder is where you create & organize a course.</li>
                    <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                    <li>Information from the Additional Data section shows up on the course single page.</li>
                    <li>Make Announcements to notify any important</li>
                    <li>Notes to all enrolled students at once.</li>
                </ul>
            </div>
        </div>
    );
}
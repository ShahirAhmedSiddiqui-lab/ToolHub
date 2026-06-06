import React, { useState, useEffect } from 'react';

export default function AgeCalculator() {
  const [birthdate, setBirthdate] = useState('1995-06-15');
  const [relativeDate, setRelativeDate] = useState(new Date().toISOString().split('T')[0]);
  const [ageDetails, setAgeDetails] = useState<{
    years: number;
    months: number;
    days: number;
    weeksLived: number;
    daysLived: number;
    monthsLived: number;
    hoursLived: number;
    minutesLived: number;
    nextBirthday: {
      months: number;
      days: number;
      dayOfWeek: string;
      daysRemaining: number;
    };
  } | null>(null);

  useEffect(() => {
    if (!birthdate) return;

    const birth = new Date(birthdate);
    const target = relativeDate ? new Date(relativeDate) : new Date();

    if (isNaN(birth.getTime()) || isNaN(target.getTime())) return;

    // Direct millisecond diff
    const diffMs = target.getTime() - birth.getTime();
    if (diffMs < 0) {
      setAgeDetails(null);
      return;
    }

    // Exact years, months, days calculation
    let birthYear = birth.getFullYear();
    let birthMonth = birth.getMonth();
    let birthDay = birth.getDate();

    let targetYear = target.getFullYear();
    let targetMonth = target.getMonth();
    let targetDay = target.getDate();

    let calculatedYears = targetYear - birthYear;
    let calculatedMonths = targetMonth - birthMonth;
    let calculatedDays = targetDay - birthDay;

    if (calculatedDays < 0) {
      // get days in previous month
      const prevMonth = new Date(targetYear, targetMonth, 0);
      calculatedDays += prevMonth.getDate();
      calculatedMonths -= 1;
    }

    if (calculatedMonths < 0) {
      calculatedMonths += 12;
      calculatedYears -= 1;
    }

    // Cumulative conversions
    const totalMinutes = Math.floor(diffMs / (1000 * 60));
    const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = (calculatedYears * 12) + calculatedMonths;

    // Next Birthday countdown details
    const nextBday = new Date(targetYear, birthMonth, birthDay);
    if (nextBday < target) {
      nextBday.setFullYear(targetYear + 1);
    }

    const nextBdayDiff = nextBday.getTime() - target.getTime();
    const daysRemaining = Math.max(0, Math.ceil(nextBdayDiff / (1000 * 60 * 60 * 24)));

    let nextBdayMonths = nextBday.getMonth() - targetMonth;
    let nextBdayDays = nextBday.getDate() - targetDay;

    if (nextBdayDays < 0) {
      const prevMonthOfBday = new Date(nextBday.getFullYear(), nextBday.getMonth(), 0);
      nextBdayDays += prevMonthOfBday.getDate();
      nextBdayMonths -= 1;
    }
    if (nextBdayMonths < 0) {
      nextBdayMonths += 12;
    }

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const nextBdayWeekDay = daysOfWeek[nextBday.getDay()];

    setAgeDetails({
      years: calculatedYears,
      months: calculatedMonths,
      days: calculatedDays,
      daysLived: totalDays,
      weeksLived: totalWeeks,
      monthsLived: totalMonths,
      hoursLived: totalHours,
      minutesLived: totalMinutes,
      nextBirthday: {
        months: nextBdayMonths,
        days: nextBdayDays,
        dayOfWeek: nextBdayWeekDay,
        daysRemaining,
      },
    });
  }, [birthdate, relativeDate]);

  return (
    <div className="w-full bg-white shadow-sm rounded-2xl border border-rose-100 p-6 md:p-8 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Enter Your Birthday Date:
          </label>
          <input
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            className="w-full p-3 border border-rose-100 text-slate-800 bg-white rounded-xl focus:border-[#FF334B] focus:ring-1 focus:ring-[#FF334B] focus:outline-hidden font-mono transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Calculate Chronological Age At (Today or Custom Date):
          </label>
          <input
            type="date"
            value={relativeDate}
            onChange={(e) => setRelativeDate(e.target.value)}
            className="w-full p-3 border border-rose-100 text-slate-800 bg-white rounded-xl focus:border-[#FF334B] focus:ring-1 focus:ring-[#FF334B] focus:outline-hidden font-mono transition-all"
          />
        </div>
      </div>

      {ageDetails ? (
        <div className="space-y-6">
          {/* Main big age readout */}
          <div className="bg-rose-50/30 border border-rose-100/50 rounded-2xl p-6 text-center">
            <span className="block text-xs uppercase tracking-widest text-[#FF334B] font-extrabold font-mono">
              Your Chronological Age
            </span>
            <div className="mt-2 flex flex-wrap justify-center gap-x-4 items-baseline">
              <span className="text-4xl md:text-5xl font-black text-[#FF334B] font-mono">
                {ageDetails.years}
              </span>
              <span className="font-semibold text-slate-600">years</span>
              <span className="text-3xl font-black text-slate-800 font-mono">
                {ageDetails.months}
              </span>
              <span className="font-semibold text-slate-600">months</span>
              <span className="text-3xl font-black text-slate-800 font-mono">
                {ageDetails.days}
              </span>
              <span className="font-semibold text-slate-600">days</span>
            </div>
          </div>

          {/* Side panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Next birthday stats */}
            <div className="border border-rose-100 p-5 rounded-xl bg-rose-50/10">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest font-mono border-b border-rose-50 pb-2 mb-3">
                Next Birthday Countdown
              </h4>
              <p className="text-xs font-semibold text-slate-600">
                Remaining period:{' '}
                <span className="font-extrabold font-mono text-[#FF334B]">
                  {ageDetails.nextBirthday.months} months, {ageDetails.nextBirthday.days} days
                </span>
              </p>
              <div className="mt-3 flex justify-between items-center bg-white p-3 rounded-lg border border-rose-50">
                <span className="text-xs font-semibold text-slate-500">Day of the Week:</span>
                <span className="text-sm font-bold text-slate-800 font-mono">
                  {ageDetails.nextBirthday.dayOfWeek}
                </span>
              </div>
              <div className="mt-2 flex justify-between items-center bg-white p-3 rounded-lg border border-rose-50">
                <span className="text-xs font-semibold text-slate-500">Total remaining:</span>
                <span className="text-sm font-extrabold text-[#FF334B] font-mono">
                  {ageDetails.nextBirthday.daysRemaining} Days
                </span>
              </div>
            </div>

            {/* Total values lived */}
            <div className="border border-rose-100 p-5 rounded-xl bg-rose-50/10">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest font-mono border-b border-rose-50 pb-2 mb-3">
                Total Cumulative Metrics
              </h4>
              <div className="space-y-2 text-xs font-medium text-slate-600">
                <div className="flex justify-between border-b border-rose-100/30 pb-1.5">
                  <span>Total Months Lived:</span>
                  <span className="font-mono font-bold text-slate-905">
                    {ageDetails.monthsLived.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between border-b border-rose-100/30 pb-1.5">
                  <span>Total Weeks Lived:</span>
                  <span className="font-mono font-bold text-slate-905">
                    {ageDetails.weeksLived.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between border-b border-rose-100/30 pb-1.5">
                  <span>Total Days Lived:</span>
                  <span className="font-mono font-bold text-slate-905">
                    {ageDetails.daysLived.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between border-b border-rose-100/30 pb-1.5">
                  <span>Total Hours Lived:</span>
                  <span className="font-mono font-bold text-slate-905">
                    {ageDetails.hoursLived.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Total Minutes Lived:</span>
                  <span className="font-mono font-bold text-slate-905">
                    {ageDetails.minutesLived.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 text-center">
          <p className="text-sm font-medium text-[#FF334B]">
            Selected birthday represents a date in the future of the calculation target. Please enter a valid past birthdate.
          </p>
        </div>
      )}
    </div>
  );
}

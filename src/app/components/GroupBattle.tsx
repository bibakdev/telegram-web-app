'use client';

import { useEffect, useState } from 'react';

interface Member {
  name: string;
  avatar: string;
  hours: number;
}

export default function GroupBattle() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0
  });

  const targetDate = new Date('2026-02-20T23:59:59').getTime();

  const teamBlueData: Member[] = [
    { name: 'امیرحسین راد', avatar: '11', hours: 68.5 },
    { name: 'سارا محمدی', avatar: '5', hours: 54.0 },
    { name: 'علی پاشا', avatar: '12', hours: 42.5 },
    { name: 'مینا کاویانی', avatar: '32', hours: 38.0 },
    { name: 'کیان ایرانی', avatar: '60', hours: 12.0 }
  ];

  const teamRedData: Member[] = [
    { name: 'رضا کریمی', avatar: '3', hours: 72.0 },
    { name: 'مهسا تهرانی', avatar: '44', hours: 51.5 },
    { name: 'کاوه', avatar: '55', hours: 48.0 },
    { name: 'نازنین', avatar: '20', hours: 45.0 },
    { name: 'سهیل آریا', avatar: '65', hours: 40.0 },
    { name: 'باران', avatar: '10', hours: 35.0 }
  ];

  // محاسبه مجموع ساعت‌ها
  const blueTotal = teamBlueData.reduce((sum, m) => sum + m.hours, 0);
  const redTotal = teamRedData.reduce((sum, m) => sum + m.hours, 0);
  const grandTotal = blueTotal + redTotal;

  const bluePercent = grandTotal > 0 ? (blueTotal / grandTotal) * 100 : 50;
  const redPercent = 100 - bluePercent;
  const diff = Math.abs(blueTotal - redTotal).toFixed(1);

  // تایمر معکوس
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      setTimeLeft({ days, hours, minutes });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  // رندر تیم
  const renderTeamMember = (
    member: Member,
    index: number,
    themeColor: 'blue' | 'red'
  ) => {
    const rank = index + 1;
    let rankClass = 'text-slate-500 font-mono text-xs';
    let icon = `#${rank}`;
    let borderClass = 'border-white/5 hover:bg-white/5';

    if (rank === 1) {
      rankClass = 'rank-1 font-bold text-base';
      icon = '👑';
      borderClass = `border-${themeColor}-500/40 bg-${themeColor}-500/10`;
    } else if (rank === 2) {
      rankClass = 'rank-2 font-bold';
      icon = '🥈';
    } else if (rank === 3) {
      rankClass = 'rank-3 font-bold';
      icon = '🥉';
    }

    return (
      <div
        key={index}
        className={`flex items-center gap-3 p-2.5 rounded-xl border ${borderClass} transition-all group`}
      >
        <div className={`w-6 text-center ${rankClass}`}>{icon}</div>
        <img
          src={`https://i.pravatar.cc/150?img=${member.avatar}`}
          alt={member.name}
          className="w-8 h-8 rounded-full object-cover border border-white/10"
        />
        <div className="flex-1">
          <div className="text-sm font-bold text-slate-200">{member.name}</div>
        </div>
        <div className="text-right">
          <div className="text-base font-mono font-bold text-white">
            {member.hours}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-2 md:p-6 min-h-screen flex flex-col items-center select-none font-sans">
      {/* Header & Timer Section */}
      <div className="text-center mb-8 w-full max-w-4xl flex flex-col items-center gap-4">
        {/* Date Range Badge */}
        <div className="inline-flex items-center gap-3 bg-surface/80 border border-white/10 px-4 py-1.5 rounded-full text-xs text-slate-400 font-mono shadow-lg backdrop-blur-md">
          <span>📅</span>
          <span>24 بهمن</span>
          <span className="text-slate-600">ـــــ</span>
          <span>01 اسفند</span>
        </div>

        {/* Countdown Timer Box */}
        <div className="glass-timer rounded-2xl p-4 flex items-center gap-4 md:gap-8">
          <div className="text-xs font-bold text-slate-400 rotate-90 md:rotate-0 whitespace-nowrap">
            زمان باقی‌مانده
          </div>

          <div className="flex items-center gap-3 text-center">
            {/* Days */}
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-black text-white font-mono">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-slate-500">روز</span>
            </div>
            <span className="text-slate-600 text-xl font-bold">:</span>
            {/* Hours */}
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-black text-white font-mono">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-slate-500">ساعت</span>
            </div>
            <span className="text-slate-600 text-xl font-bold">:</span>
            {/* Minutes */}
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-black text-white font-mono">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-slate-500">دقیقه</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scoreboard */}
      <div className="w-full max-w-5xl mb-8 relative">
        {/* Score Numbers */}
        <div className="flex justify-between items-end px-4 mb-2">
          <div className="text-left">
            <div className="text-[10px] md:text-xs text-blue-300 font-bold mb-1 uppercase tracking-widest">
              تیم آبی (یخی)
            </div>
            <div className="text-3xl md:text-5xl font-black text-white drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
              {blueTotal.toFixed(1)}
            </div>
            <div className="text-[10px] text-slate-500 font-mono mt-1">
              ساعت مطالعه
            </div>
          </div>

          {/* VS Badge */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-10 h-10 md:w-16 md:h-16 bg-surface border-4 border-dark rounded-full flex items-center justify-center shadow-xl animate-pulse-slow">
              <span className="font-black italic text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-red-500 text-sm md:text-xl">
                VS
              </span>
            </div>
          </div>

          <div className="text-right">
            <div className="text-[10px] md:text-xs text-red-300 font-bold mb-1 uppercase tracking-widest">
              تیم قرمز (آتش)
            </div>
            <div className="text-3xl md:text-5xl font-black text-white drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">
              {redTotal.toFixed(1)}
            </div>
            <div className="text-[10px] text-slate-500 font-mono mt-1">
              ساعت مطالعه
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-3 md:h-5 w-full bg-surface rounded-full overflow-hidden flex relative shadow-inner mx-auto max-w-[98%]">
          <div
            className="h-full bg-gradient-to-r from-blue-700 to-blue-500 relative transition-all duration-1000 ease-out"
            style={{ width: `${bluePercent}%` }}
          >
            <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
          </div>
          <div
            className="h-full bg-gradient-to-l from-red-700 to-red-500 relative transition-all duration-1000 ease-out"
            style={{ width: `${redPercent}%` }}
          >
            <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
          </div>

          {/* Indicator */}
          <div
            className="absolute top-1/2 -translate-y-1/2 transition-all duration-1000 ease-out z-20 text-sm md:text-lg drop-shadow-lg"
            style={{
              left: `${bluePercent}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            {blueTotal > redTotal ? '❄️' : redTotal > blueTotal ? '🔥' : '⚔️'}
          </div>
        </div>

        {/* Status Text */}
        <div className="text-center mt-4">
          <span
            className={`text-xs font-bold px-4 py-2 rounded-full inline-block ${
              blueTotal > redTotal
                ? 'bg-blue-500/10 border border-blue-500/30 text-blue-200 animate-pulse'
                : redTotal > blueTotal
                  ? 'bg-red-500/10 border border-red-500/30 text-red-200 animate-pulse'
                  : 'bg-white/5 border border-white/10 text-slate-300'
            }`}
          >
            {blueTotal > redTotal ? (
              <>
                💎 تیم <span className="text-blue-400">آبی</span> با {diff} ساعت
                اختلاف پیشتاز است
              </>
            ) : redTotal > blueTotal ? (
              <>
                🔥 تیم <span className="text-red-400">قرمز</span> با {diff} ساعت
                اختلاف پیشتاز است
              </>
            ) : (
              '⚖️ نبرد برابر است!'
            )}
          </span>
        </div>
      </div>

      {/* Teams Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-5xl pb-10">
        {/* Team BLUE */}
        <div className="glass-blue rounded-3xl p-4 md:p-6 flex flex-col h-full relative overflow-hidden">
          <div className="flex items-center gap-4 mb-6 border-b border-blue-500/20 pb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-2xl shadow-lg">
              ❄️
            </div>
            <div>
              <h2 className="text-lg font-black text-white">گرگ‌های یخی</h2>
              <p className="text-[10px] text-blue-200 opacity-70">
                سرد و بی‌رحم
              </p>
            </div>
            <div className="mr-auto">
              <span className="bg-blue-500/20 text-blue-300 text-[10px] px-2 py-1 rounded font-mono">
                {teamBlueData.length} نفر
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {[...teamBlueData]
              .sort((a, b) => b.hours - a.hours)
              .map((member, index) => renderTeamMember(member, index, 'blue'))}
          </div>
        </div>

        {/* Team RED */}
        <div className="glass-red rounded-3xl p-4 md:p-6 flex flex-col h-full relative overflow-hidden">
          <div className="flex items-center gap-4 mb-6 border-b border-red-500/20 pb-4">
            <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center text-2xl shadow-lg">
              🔥
            </div>
            <div>
              <h2 className="text-lg font-black text-white">اژدهای سرخ</h2>
              <p className="text-[10px] text-red-200 opacity-70">آتش و خون</p>
            </div>
            <div className="mr-auto">
              <span className="bg-red-500/20 text-red-300 text-[10px] px-2 py-1 rounded font-mono">
                {teamRedData.length} نفر
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {[...teamRedData]
              .sort((a, b) => b.hours - a.hours)
              .map((member, index) => renderTeamMember(member, index, 'red'))}
          </div>
        </div>
      </div>
    </div>
  );
}

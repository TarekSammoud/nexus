import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { JamService } from 'src/app/core/services/jam/jam.service';
import { Jam } from 'src/app/core/entities/Jam/jam';
import { VipJamService, VipJam } from 'src/app/core/services/jam/vip-jam.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-jam-calendar',
  templateUrl: './jam-calendar.component.html',
  styleUrls: ['./jam-calendar.component.css']
})
export class JamCalendarComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: ''
    },
    events: [],
    eventClick: this.handleEventClick.bind(this),
    eventDidMount: (info) => {
      const tooltip = info.event.extendedProps['tooltip'];
      if (tooltip) {
        info.el.setAttribute('title', tooltip);
      }
    }
  };

  constructor(
    private jamService: JamService,
    private vipJamService: VipJamService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    const [regularJams, vipJams] = await Promise.all([
      firstValueFrom(this.jamService.getJams()),
      firstValueFrom(this.vipJamService.getAllVipJams())
    ]);

    const regularEvents = regularJams.flatMap(jam => [
      {
        title: `🎮 ${jam.name}`,
        start: jam.devStartDate,
        end: jam.devEndDate,
        classNames: ['dev-jam'],
        extendedProps: {
          jam,
          tooltip: `📜 ${jam.description}
🛠️ ${jam.devStartDate} → ${jam.devEndDate}
🗳️ ${jam.voteStartDate} → ${jam.voteEndDate}
🏆 ${jam.reward || 'No reward'}`
        }
      },
      {
        title: `🗳️ Voting: ${jam.name}`,
        start: jam.voteStartDate,
        end: jam.voteEndDate,
        classNames: ['vote-jam'],
        extendedProps: {
          jam,
          tooltip: `🗳️ Voting: ${jam.voteStartDate} → ${jam.voteEndDate}`
        }
      }
    ]);

    const vipEvents = vipJams.map((vip: VipJam) => ({
      title: `👑 ${vip.name}`,
      start: vip.devStartDate,
      end: vip.devEndDate,
      classNames: ['vip-jam'],
      extendedProps: {
        vip,
        tooltip: `🎯 ${vip.description}
🛠️ ${vip.devStartDate} → ${vip.devEndDate}
🏆 ${vip.reward || 'No reward'}
🎨 ${vip.bannerType || 'N/A'}`
      }
    }));

    const allEvents = [...regularEvents, ...vipEvents];

    // ⭐ Pick one jam to be the sparkle star!
    const randomIndex = Math.floor(Math.random() * allEvents.length);
    allEvents[randomIndex].classNames.push('star-jam');

    this.calendarOptions.events = allEvents;
  }

  handleEventClick(info: any): void {
    const jam = info.event.extendedProps.jam || info.event.extendedProps.vip;
    const name = jam.name;
    const devStart = jam.devStartDate;
    const devEnd = jam.devEndDate;
    const voteStart = jam.voteStartDate || 'N/A';
    const voteEnd = jam.voteEndDate || 'N/A';
    const reward = jam.reward || 'No reward';

    alert(`📌 ${name}
🛠️ Dev: ${devStart} → ${devEnd}
🗳️ Voting: ${voteStart} → ${voteEnd}
🏆 Reward: ${reward}`);
  }
}

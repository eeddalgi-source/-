# 포함된 외부 스킬

`.claude/skills/`와 `.claude/agents/`에 아래 저장소의 스킬을 그대로 복사해 두었습니다. 라이선스 전문은 `third_party_licenses/`에 있습니다.

| 출처 | 커밋 | 라이선스 | 복사한 것 |
|---|---|---|---|
| https://github.com/heygen-com/hyperframes | c1e96a4 | Apache-2.0 | `skills/*` (hyperframes, hyperframes-cli, hyperframes-registry, media-use, figma, slideshow, style-sampling, reverse-any-video, remotion-to-hyperframes) |
| https://github.com/daleseo/korean-skills | ae12ba2 | MIT | `skills/humanizer` → `humanizer-ko`로 이름 변경 |
| https://github.com/AgriciDaniel/claude-seo | 6be93f4 | MIT | `skills/*`, `schema/`, `data/`, `scripts/` (→ `seo/` 안), `agents/*.md` (hooks 제외) |
| https://github.com/PleasePrompto/notebooklm-skill | c80722d | MIT | 저장소 전체 → `notebooklm` |

`.claude/skills/skill-buttons/`는 이 저장소에서 만든 버튼 패널 mod입니다.

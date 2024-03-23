<script>
    import {onMount} from 'svelte';
    import {Progressbar, Modal, Button} from 'flowbite-svelte';
    import AnswerButton from "./AnswerButton.svelte";
    import TitlePage from "./TitlePage.svelte";
    import {getQuizdata} from "./quizdataFactory";

    const [InitialState, TitleState, QuestionState, AnswerState, GameoverState, QuizStart] = [0, 1, 2, 3, 4, 5];
    const MaxTime = 180;
    let time = MaxTime;
    let state = InitialState;
    let currentScore = 0;
    let renzokuSeikai = 0;
    let quizdata;
    let showGameoverModal = false;

    onMount(()=>{
        changeToTitle();
    });

    const changeToTitle = () => {
        state = TitleState;
    };
    const changeToQuestion = () => {
        quizdata = getQuizdata();
        state = QuestionState;
    };
    const changeToAnswer = () => {
        state = AnswerState;
        setTimeout(changeToQuestion, 1000);
    };
    const changeToGameover = () => {
        state = GameoverState;
        showGameoverModal = true;
    };
    const changeToQuizstart = () => {
        state = QuizStart;
        currentScore = 0;
        renzokuSeikai = 0;
        time = MaxTime;
        const timer = setInterval(()=>{
            if(state===QuestionState && time<0){
                clearInterval(timer);
                changeToGameover();
            }
            time -= 0.1;
        }, 100);
        changeToQuestion();
    };

    const answerButtonClicked = (isCorrect) => {
        if(isCorrect){
            renzokuSeikai += 1;
            currentScore += renzokuSeikai;
        }
        else{
            renzokuSeikai = 0;
        }
        changeToAnswer();
    };
</script>

{#if state===TitleState}
    <TitlePage on:click={changeToQuizstart}></TitlePage>
{:else if state===QuestionState || state===AnswerState||state===GameoverState}
    <main class="flex flex-col h-dvh">
        <!-- メニューバー -->
        <div class="bg-red-200 flex justify-around text-xl font-bold p-3">
            <div>スコア:{currentScore}</div>
            <div>連続正解数:{renzokuSeikai}</div>
        </div>

        <!-- プログレスバー -->
        <Progressbar progress={time/MaxTime*100} />

        <!-- 問題 -->
        <div class="bg-green-200 text-center text-4xl py-4">{quizdata.mondai}</div>
        
        <!-- 選択肢 -->
        <div class="bg-blue-200 flex flex-col justify-around flex-grow items-center">
            {#each quizdata.taku as t}
                <AnswerButton
                    isGrayout={state===AnswerState && quizdata.seikai!==t}
                    on:click={() => answerButtonClicked(quizdata.seikai===t)}>
                    {t}
                </AnswerButton>
            {/each}
        </div>
    </main>
{/if}


<Modal bind:open={showGameoverModal} dismissable={false} autoclose title="ゲームオーバー">
    <div class="flex flex-col items-center">
        <div class="text-center text-black font-bold mb-5">
            スコア:{currentScore}
        </div>
        <Button color="blue" class="w-1/2" on:click={changeToTitle}>OK</Button>
    </div>
</Modal>
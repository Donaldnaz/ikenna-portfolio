"use client";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";

const skillCategories = [
	{
		title: "Cloud & Infrastructure",
		skills: ["AWS", "Azure", "GCP", "Terraform", "CloudFormation", "IaC"]
	},
	{
		title: "Serverless & Messaging",
		skills: ["Lambda", "Step Functions", "EventBridge", "Pub/Sub", "API Gateway"]
	},
	{
		title: "Containers & Orchestration",
		skills: ["Docker", "Kubernetes", "Cloud Run", "ECR", "Artifact Registry"]
	},
	{
		title: "Data & AI",
		skills: ["Python", "BigQuery", "SQL", "Vertex AI", "FastAPI"]
	},
	{
		title: "DevOps & Reliability",
		skills: ["CI/CD", "GitHub Actions", "IAM", "CloudWatch", "Observability"]
	}
];

export default function Skills() {
	return (
		<div className="relative pb-16">
			<Navigation />
			<div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
				<div className="max-w-2xl mx-auto lg:mx-0">
					<h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
						Skills
					</h2>
					<p className="mt-4 text-zinc-400">
						Technical expertise in cloud architecture, AI platform engineering, and DevOps.
					</p>
				</div>
				<div className="w-full h-px bg-zinc-800" />

				<div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-2 lg:grid-cols-3">
					{skillCategories.map((category) => (
						<Card key={category.title}>
							<div className="p-4 relative flex flex-col h-full gap-4 duration-700 group md:gap-8 md:p-8">
								<h3 className="text-xl font-bold text-zinc-100 group-hover:text-white font-display">
									{category.title}
								</h3>
								<ul className="flex flex-wrap gap-2 mt-4">
									{category.skills.map((skill) => (
										<li 
											key={skill}
											className="px-3 py-1 text-xs font-medium border rounded-full text-zinc-400 border-zinc-500 bg-zinc-900 group-hover:text-zinc-200 group-hover:border-zinc-200 duration-500"
										>
											{skill}
										</li>
									))}
								</ul>
							</div>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
